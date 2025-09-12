"use server";

import { z } from "zod";
import { Product, Size } from "../../../generated/prisma";
import prisma from "../../../lib/prisma";
import { revalidatePath } from "next/cache";
import cloudinary from "../../../lib/cloudinary";
import { sleep } from "@/utils/sleep";

const productSchema = z.object({
  id: z.uuid("El ID debe ser un UUID válido").optional().nullable(),
  title: z
    .string()
    .min(2, "El titulo debe tener al menos 2 caracteres")
    .max(100, "El titulo debe tener menos de 100 caracteres"),
  slug: z
    .string()
    .min(2, "El slug debe tener al menos 2 caracteres")
    .max(100, "El slug debe tener menos de 100 caracteres"),
  description: z
    .string()
    .min(2, "La descripción debe tener al menos 2 caracteres"),
  price: z.coerce
    .number()
    .min(0, "El precio debe ser mayor a 0")
    .transform((value) => Number(value.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0, "El stock debe ser mayor a 0")
    .transform((value) => Number(value.toFixed())),
  tags: z.string().min(2, "El tag debe tener al menos 2 caracteres"),
  gender: z.enum(["men", "women", "kid", "unisex"]),
  categoryId: z.uuid("El ID de la categoría debe ser un UUID válido"),
  sizes: z.coerce
    .string()
    .transform((value) => value.split(",").map((size) => size.trim())),
});

export const createUpdateProduct = async (formData: FormData) => {
  console.log("pasando");
  const productParsed = productSchema.safeParse(Object.fromEntries(formData));

  if (!productParsed.success) {
    console.log(productParsed.error);
    return {
      form: formData,
      ok: false,
      message: productParsed.error,
    };
  }

  const product = productParsed.data;
  console.log(product, "product parsed");
  product.slug = product.slug.toLowerCase().replace(/\s/g, "-").trim();

  const { id, ...rest } = product;
  const prismaTx = await prisma.$transaction(async (tx) => {
    let productToCreateUpdate: Product;
    const tagsArray = rest.tags.split(/[\s,]+/).map((tag) => tag.trim());
    if (id) {
      //update product
      productToCreateUpdate = await tx.product.update({
        where: {
          id,
        },
        data: {
          ...rest,
          sizes: {
            set: rest.sizes as Size[],
          },
          tags: {
            set: tagsArray,
          },
        },
      });
    } else {
      //create product

      productToCreateUpdate = await tx.product.create({
        data: {
          ...rest,
          sizes: {
            set: rest.sizes as Size[],
          },
          tags: {
            set: tagsArray,
          },
        },
      });
    }

    console.log({ updateCreateddProduct: productToCreateUpdate });

    //upload and save images
    //browse through images and save them

    if (formData.getAll("images")) {
      const imagesUrls = await uploadImages(
        formData.getAll("images") as File[]
      );
      console.log(imagesUrls, "urls de las imágenes en cloudinary");

      if (!imagesUrls) {
        throw new Error("Error al subir las imágenes");
      }

      const imagesDB = await tx.productImage.createMany({
        data: imagesUrls.map((url) => ({
          productId: productToCreateUpdate.id,
          url: url!,
        })),
      });

      console.log(imagesDB, "imagesDB");
    }

    return {
      ok: true,
      message: "Producto creado correctamente",
      productToCreateUpdate,
    };
  });

  revalidatePath(`/admin/products`);
  revalidatePath(`/admin/product/${product.slug}`);
  revalidatePath(`/products`);
  return {
    ok: true,
    productToCreateUpdate: prismaTx.productToCreateUpdate,
  };
};

export const uploadImages = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString("base64");

        return cloudinary.uploader
          .upload(`data:${image.type};base64,${base64Image}`, {
            folder: "products",
          })
          .then((result) => result.secure_url);
      } catch (error) {
        console.log(error);
        return null;
      }
    });

    const imagesUrls = await Promise.all(uploadPromises);
    return imagesUrls;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteImage = async (
  imageId: number,
  imageUrl: string,

) => {


  // "/my-cloudinary-ar/image/upload/v1757621364/products/czqm3y7xgfixgwsam2wz.avif"

  // Dividir por "/" y quitar los segmentos de versión + extensión
  const parts = imageUrl.split("/");
  const withoutVersion = parts.slice(7).join("/"); // "products/czqm3y7xgfixgwsam2wz.avif"

  const publicId = withoutVersion.replace(/\.[^/.]+$/, ""); // quitar extensión
  console.log(publicId, "publicId");
  try {
    const cloudinaryResult = await cloudinary.uploader.destroy(publicId);
    console.log("cloudinaryresult", cloudinaryResult);
    if (cloudinaryResult.result !== "ok") {
      return {
        ok: false,
        message: "Error al eliminar la imagen en Cloudinary",
      };
    }
    console.log("borrando de la base de datos");
    const deletedImage = await prisma.productImage.delete({
      where: { id: imageId },
      select: {
        product: {
          select: {
            slug: true,
          },
        },
      },
    });
    console.log(deletedImage, "deletedImage");
    revalidatePath(`/admin/products`);
    revalidatePath(`/admin/product/${deletedImage.product.slug}`);
    revalidatePath(`/products`);
    return { ok: true, message: "Imagen eliminada correctamente" };
  } catch (error) {
    console.error(error);
    return { ok: false, message: "No se pudo eliminar la imagen" };
  }
};
