'use server'

import { auth } from "@/auth";
import prisma from "../../../lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getOrdersAdmin = async ({
  take = 10,
  page = 1,
}: PaginationOptions) => {


  const session = await auth();

  if (!session) {
    return {
      ok: false,
      error: "No autenticado",
    };
  }

  if (!session.user.roles.includes("ADMIN")) {
    return {
      ok: false,
      error: "No tienes permiso para ver esta orden",
    };
  }
  try {
    const orders = await prisma.order.findMany({
      take,
      skip: (page - 1) * take,
      include: {
        orderAddress: {
          select: {
            name: true,
            lastName: true,
            country: true,
          },
        },
      },
    });

    const totalOrders = await prisma.order.count();

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
};
