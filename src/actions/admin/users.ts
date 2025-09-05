import { auth } from "@/auth";
import prisma from "../../../lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getUsersAdmin = async ({
  page = 1,
  take = 10,
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
    const users = await prisma.user.findMany({
      take,
      skip: (page - 1) * take,
      orderBy:{
        name:"desc"
      }
    });

    if(!users){
        return {
            ok: false,
            message: "Error al obtener los usuarios",
        };
    }
    const totalUsers = await prisma.user.count();

    const totalPages = Math.ceil(totalUsers / take);
    return {
      ok: true,
      users,
      totalPages,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error al obtener los usuarios",
    };
  }
};
