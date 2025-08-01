"use server";

import { Category } from "@/interfaces";
import prisma from "../../../lib/prisma";
import { redirect } from "next/navigation";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getPaginatedProductsWithImages = async ({
  take = 12,
  page = 1,
}: PaginationOptions) => {

  // ensure the arguments are always numbers
  take = Number(take);
  page = Number(page);

  // validatios
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    // get products total count
    const totalProducts = await prisma.product.count();


    const products = await prisma.product.findMany({
      take,
      skip: (page - 1) * take,
      include: {
        images: {
          take: 2,
          select: { url: true },
        },
      },
    });


    const categories = await prisma.category.findMany({
      include: { product: true },
    });

    // calculate total pages
    const totalPages = Math.ceil(totalProducts / take);

    //return object
    return {
      totalPages,
      currentPage: page,
      products: products.map((product) => {
        return {
          ...product,
          images: product.images.map((i) => i.url),
          categorie: categories.find((c) => c.id === product.categoryId)
            ?.name as Category,
        };
      }),
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching products with images");
  }
};
