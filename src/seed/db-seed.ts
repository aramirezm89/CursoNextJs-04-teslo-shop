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

  const categoriesData = initialData.categories.map((categoryName) =>{
    return {
      name: categoryName,
    }
  })
  const categoriesBD = await prisma.category.createMany({data: categoriesData})

  console.log("Categories created:", categoriesBD)
}

(() => {
  if (process.env.NODE_ENV === "production") return;
  main();
})();
