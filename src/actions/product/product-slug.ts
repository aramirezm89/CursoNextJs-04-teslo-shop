'use server'

import { unstable_cache } from "next/cache";
import prisma from "../../../lib/prisma";
import { Category } from "@/interfaces";

export const getProductBySlug = unstable_cache(
  async (slug: string) => {
    try {
      const product = await prisma.product.findFirst({
        where: { slug },
        include: { images: { take: 2, select: { url: true } } },
      });

 if(!product) return null;
      
    const category = await prisma.category.findFirst({
      where: { id: product.categoryId }
    });
      return {
        ...product,
        images: product!.images.map((p) => p.url),
        sizes: product?.sizes || [],
        categorie: category?.name as Category,
      };
    } catch (error) {
      console.log(error);
    
  
    }
  },
  [`product-by-slug`],
  {
    revalidate: 604800,
    
  }
);

export const getInStockProduct = async (slug: string) => {
  try {
    const product = await prisma.product.findFirst({
      where: { slug },
      select: { inStock: true },
    });

  
    return product?.inStock ?? 0;
  } catch (error) {
    console.log(error)
    return 0
  }
};
