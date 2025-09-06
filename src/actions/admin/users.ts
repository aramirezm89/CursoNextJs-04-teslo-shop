"use server";

import { auth } from "@/auth";
import prisma from "../../../lib/prisma";
import { revalidatePath } from "next/cache";

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
      orderBy: {
        name: "desc",
      },
    });

    if (!users) {
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

export const changeUserRole = async (userId: string, role: "ADMIN" | "USER") => {
  const session = await auth();

  if (!session?.user.roles.includes("ADMIN")) {
    return {
      ok: false,
      message: "No tienes permiso para cambiar el rol",
    };
  }


  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return {
        ok: false,
        message: "Error al obtener el usuario",
      };
    }

    if(user.id === session.user.id){
      return {
        ok: false,
        message: "No puedes cambiar el rol de ti mismo",
      };
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role: role,
      },
    });

    if (!updatedUser) {
      return {
        ok: false,
        message: "Error al actualizar el role del usuario",
      };
    }

    console.log("update user role", user.name, updatedUser.role);
    revalidatePath("/admin/users");
    return {
      ok: true,
      message: "",
      updatedUser,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error al cambiar el rol",
    };
  }
};
