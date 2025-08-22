"use server";
import bcrypt from "bcrypt";
import prisma from "../../../lib/prisma";
import { newAccountInputs } from "./interfaces/auth";
import { signIn } from "@/auth";

// this function is call on auth.ts  in authorize() method
export const sigInWithCredentials = async (email: string, password: string) => {
  if (!email || !password) return null;

  const user = await prisma.user.findUnique({ where: { email } });

  console.log("bd user", user);

  if (!user) return null;

  const isvalidPassword = bcrypt.compareSync(password, user.password!);

  if (!isvalidPassword) return null;

  return user;
};

export const registerUser = async (dataInputs: newAccountInputs) => {

  try {
    if (!dataInputs.name || !dataInputs.email || !dataInputs.password)
      return {
        ok: false,
        error: "Faltan datos",
      };

    const user = await prisma.user.create({
      data: {
        name: dataInputs.name,
        email: dataInputs.email.toLowerCase(),
        password: bcrypt.hashSync(dataInputs.password, 10),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return {
      ok: true,
      user,
      error: "",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: "Error al crear la cuenta",
    };
  }
};

export const login = async (email: string, password: string) => {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return {
      ok: true,
      message: "",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error al iniciar sesión",
    };
  }
};
