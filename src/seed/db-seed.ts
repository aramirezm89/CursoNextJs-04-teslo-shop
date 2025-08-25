import prisma from "../../lib/prisma";
import { initialData } from "./seed";
import { countries } from "./seed-contry";

async function main() {
  // 1. Delete existing data
  await Promise.all([
    prisma.productImage.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
    prisma.user.deleteMany(),
    prisma.userAddress.deleteMany(),
    prisma.country.deleteMany(),
  ]);

  const countriesBD = await prisma.country.createMany({ data: countries });

  console.log("Countries created:", countriesBD);

  const usersBD = await prisma.user.createMany({ data: initialData.users });

  console.log("Users created:", usersBD);

  // 2. Create categories

  const categoriesData = initialData.categories.map((categoryName) => {
    return {
      name: categoryName,
    };
  });
  const categoriesBD = await prisma.category.createMany({
    data: categoriesData,
  });

  console.log("Categories created:", categoriesBD);

  // 3. create products

  const categories = await prisma.category.findMany();
  const categoriesMap = categories.reduce<Record<string, string>>(
    (acc, category) => {
      acc[category.name] = category.id;
      return acc;
    },
    {}
  );

  const productsData = initialData.products.map((p) => {
    const { type, images, ...productData } = p;
    return {
      ...productData,
      categoryId: categoriesMap[type],
    };
  });

  const productsDB = await prisma.product.createMany({ data: productsData });

  console.log("Products created:", productsDB);

  // You can now use productsData as needed, e.g., insert into DB
  // await prisma.product.createMany({ data: productsData });x

  // 4. Create product images
  const products = await prisma.product.findMany();

  const productImageData = initialData.products.flatMap((p) => {
    const product = products.find((prod) => prod.slug === p.slug);
    if (!product) throw new Error("Product not found: " + p.slug);
    return p.images.map((image) => {
      return {
        url: image,
        productId: product.id,
      };
    });
  });

  const productImageDb = await prisma.productImage.createMany({
    data: productImageData,
  });

  console.log("Product images created:", productImageDb);
}

(() => {
  if (process.env.NODE_ENV === "production") return;
  main();
})();
