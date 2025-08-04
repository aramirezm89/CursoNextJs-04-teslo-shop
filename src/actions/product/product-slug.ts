'use server'

import { unstable_cache } from "next/cache";
import prisma from "../../../lib/prisma";

export const getProductBySlug = unstable_cache(
  async (slug: string) => {
    try {
      const product = await prisma.product.findFirst({
        where: { slug },
        include: { images: { take: 2, select: { url: true } } },
      });

      return {
        ...product,
        images: product!.images.map((p) => p.url),
        sizes: product?.sizes || [],
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
