"use server";

import { auth } from "@/auth";
import { Address, Size } from "@/interfaces";
import prisma from "../../../lib/prisma";

interface ProductToOrder {
  id: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  products: ProductToOrder[],
  address: Address
) => {
  //verify if user session is valid
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) {
    return {
      ok: false,
      error: "No autenticado",
    };
  }

  //get products info
  //note: remember we can take 2 products with the same id
  const productsInfo = await prisma.product.findMany({
    where: {
      id: {
        in: products.map((p) => p.id),
      },
    },
  });

  // calculate amount

  const itemsInOrder = products.reduce(
    (acc, product) => acc + product.quantity,
    0
  );
  const subtotal = products.reduce((acc, product) => {
    const productInfo = productsInfo.find((p) => p.id === product.id);
    return acc + productInfo!.price * product.quantity;
  }, 0);

  const tax = subtotal * 0.15;
  const total = subtotal + tax;

  console.log(
    products,
    address,
    userId,
    productsInfo,
    itemsInOrder,
    subtotal,
    tax,
    total
  );

  try {
    const prismaTransaction = await prisma.$transaction(async (tx) => {
      // 1. update prouduct stock

      const updatedProductPromises = productsInfo.map(async (p) => {
        //get quantity of product to update
        const productQuantity = products
          .filter((p2) => p2.id === p.id)
          .reduce((acc, item) => acc + item.quantity, 0);

        if (productQuantity === 0)
          throw new Error(`La cantidad del producto ${p.title} no puede ser 0`);

        return await tx.product.update({
          where: { id: p.id },
          data: {
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProductPromises);

      //verify if products are in stock

      for (const product of updatedProducts) {
        if (product.inStock < 0) {
          throw new Error(`${product.title} no tiene stock suficiente`);
        }
      }
      // 2 create order and details

      const order = await tx.order.create({
        data: {
          total,
          subtotal,
          tax,
          itemsInOrder,
          userId,
          orderItems: {
            createMany: {
              data: products.map((p) => ({
                quantity: p.quantity,
                price: productsInfo.find((p2) => p2.id === p.id)!.price,
                size: p.size,
                productId: p.id,
              })),
            },
          },
        },
      });
      if (!order) {
        throw new Error(`Error al crear la orden`);
      }

      // validate if orderItems in order have price 0
      const orderItems = await tx.orderItem.findMany({
        where: {
          orderId: order.id,
        },
      });

      const orderItemsWithPrice = orderItems.every((orderItem) => {
        return orderItem.price > 0;
      });

      if (!orderItemsWithPrice) {
        throw new Error(
          `Error al crear la orden, los precios de los productos no son validos`
        );
      }

      const orderAddress = await tx.orderAddress.create({
        data: {
          name: address.name,
          lastName: address.lastName,
          address: address.address,
          address2: address.address2,
          zip: address.zip,
          city: address.city,
          phone: address.phone,
          orderId: order.id,
          countryId: address.country,
        },
      });

      if (!orderAddress) {
        throw new Error(`Error al crear la orden, la direccion no es valida`);
      }

      return {
        ok: true,
        order,
        orderAddress,
        updatedProducts,
      };
    });

    return {
      ok: true,
      order: prismaTransaction.order,
      prismaTx: prismaTransaction,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return {
      ok: false,
      error: error.message,
    };
  }
};

export const getOrderById = async (id: string) => {
  const session = await auth();
  if (!session) {
    return {
      ok: false,
      error: "No autenticado",
    };
  }
  try {
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        orderItems: {
          include: {
            product: {
              include: {
                images: {
                  take: 1,
                  select: {
                    url: true,
                  },
                },
              },
            },
          },
        },
        orderAddress: {
          include: {
            country: true,
          },
        },
      },
    });

    if (order?.userId !== session.user.id) {
      console.log("No tienes permiso para ver esta orden");
      return {
        ok: false,
        error: "No tienes permiso para ver esta orden",
      };
    }
    return {
      ok: true,
      order,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: "Error al obtener la orden",
    };
  }
};




interface PaginationOptions {
  page?: number;
  take?: number;

}


export const getOrdersByUser = async ({
  take = 10,
  page = 1,
}: PaginationOptions) =>{
  const session = await auth();
  if (!session) {
    return {
      ok: false,
      error: "No autenticado",
    };
  }
  try {
    const orders = await prisma.order.findMany({
      take,
      skip: (page - 1) * take,
      where: {
        userId: session.user.id,
      },
      include:{
        orderAddress:{
          select:{
            name:true,
            lastName:true,
            country:true,
           
          }
        }
      }
    });
    
    const totalOrders = await prisma.order.count({
      where: {
        userId: session.user.id,
      },
    });
    
    const totalPages = Math.ceil(totalOrders / take);


    
     
    return {
      ok: true,
      totalPages,
      currentPage: page,
      orders,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: "Error al obtener las ordenes",
      totalPages: 0,
      currentPage: 1,
    };
  }

}