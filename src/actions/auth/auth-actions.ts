import prisma from "../../../lib/prisma";
import bcrypt from "bcrypt";

export const sigInWithCredentials = async (email: string, password: string) => {
  if (!email || !password) return null;

  const user = await prisma.user.findUnique({ where: { email } });

  console.log("bd user", user)

  if (!user) return null;

  const isvalidPassword = bcrypt.compareSync(password, user.password!);

  if (!isvalidPassword) return null;

  return user;
};
