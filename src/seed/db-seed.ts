import prisma from "../../lib/prisma";
import { initialData } from "./seed";

async function main() {

  // 1. Delete existing data
  await Promise.all([
    prisma.productImage.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
  ]);

  // 2. Create categories
}

(() => {
  if (process.env.NODE_ENV === "production") return;
  main();
})();
