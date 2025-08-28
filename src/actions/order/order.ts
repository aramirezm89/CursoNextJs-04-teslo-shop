"use server";

import { Address, Size } from "@/interfaces";
import prisma from "../../../lib/prisma";
import { auth } from "@/auth";

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

    console.log(productsInfo);

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
    const subTotal = products.reduce((acc, product) => {
      const productInfo = productsInfo.find((p) => p.id === product.id);
      return acc + productInfo!.price * product.quantity;
    }, 0);

    const tax = subTotal * 0.15;
    const total = subTotal + tax;

    console.log(
      products,
      address,
      userId,
      productsInfo,
      itemsInOrder,
      subTotal,
      tax,
      total
    );
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: "Error al crear la orden",
    };
  }
};
