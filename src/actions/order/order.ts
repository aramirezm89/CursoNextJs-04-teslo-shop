"use server";

import { Address, Size } from "@/interfaces";
import prisma from "../../../lib/prisma";
import { auth } from "@/auth";
import { create } from "domain";

interface ProductToOrder {
  id: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  products: ProductToOrder[],
  address: Address
) => {
  try {
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

    // verify if products are in stock
    const productsInStock = productsInfo.every((product) => {
      return (
        product.inStock >= products.find((p) => p.id === product.id)!.quantity
      );
    });

    if (!productsInStock) {
      return {
        ok: false,
        error: "No hay stock de algunos productos",
      };
    }
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

    const prismaTransaction = await prisma.$transaction(async (tx) => {
      // 1. update prouduct stock

      /*       const productsUpdated = products.map((p) =>
        tx.product.update({
          where: { id: p.id },
          data: {
            inStock: {
              decrement: p.quantity,
            },
          },
          select:{
            id:true,
            
          }
        })
      );
 */
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
      };
    });

    return {
      ok: true,
      order: prismaTransaction.order,
      orderAddress: prismaTransaction.orderAddress,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: "Error al crear la orden",
    };
  }
};
