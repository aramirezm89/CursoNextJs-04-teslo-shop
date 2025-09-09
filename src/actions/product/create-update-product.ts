'use server';

import { z } from "zod";
import { Product, Size } from "../../../generated/prisma";
import prisma from "../../../lib/prisma";
import { revalidatePath } from "next/cache";

const productSchema = z.object({
    id: z.uuid("El ID debe ser un UUID válido").optional().nullable(),
    title: z.string().min(2, "El titulo debe tener al menos 2 caracteres").max(100, "El titulo debe tener menos de 100 caracteres"),
    slug: z.string().min(2, "El slug debe tener al menos 2 caracteres").max(100, "El slug debe tener menos de 100 caracteres"),
    description: z.string().min(2, "La descripción debe tener al menos 2 caracteres"),
    price: z.coerce.number().min(0, "El precio debe ser mayor a 0").transform((value) => Number(value.toFixed(2))),
    inStock: z.coerce.number().min(0, "El stock debe ser mayor a 0").transform((value) => Number(value.toFixed())),
    tags: z.string().min(2, "El tag debe tener al menos 2 caracteres"),
    gender: z.enum(["men", "women", "kid", "unisex"]),
    categoryId: z.uuid("El ID de la categoría debe ser un UUID válido"),
    sizes: z.coerce.string().transform((value) => value.split(",").map((size) => size.trim())),

})

export const createUpdateProduct = async (formData: FormData) => {


    const productParsed =  productSchema.safeParse(Object.fromEntries(formData))

    if(!productParsed.success){
        console.log(productParsed.error)
        return {
            form: formData ,
            ok: false,
            message: productParsed.error
        }
    }
 
 

    const product = productParsed.data;
    console.log(product, "product parsed")
    product.slug = product.slug.toLowerCase().replace(/\s/g, "-").trim();

    const { id, ...rest } = product;
    const prismaTx  = await prisma.$transaction(async (tx) =>{
      
        let productToCreateUpdate : Product;
        const tagsArray  = rest.tags.split(/[\s,]+/) .map((tag) => tag.trim());
        if(id){
            //update product
            productToCreateUpdate = await tx.product.update({
                where: {
                    id
                },
                data: {
                    ...rest,
                    sizes: {
                        set: rest.sizes as Size[]
                    },
                    tags:{
                        set: tagsArray
                    }
                }
            })

            console.log({updatedProduct: productToCreateUpdate})

       
        
        }else{
            
        }

        return{
            ok: true,
            message: "Producto creado correctamente",
           
        }
    })

  revalidatePath(`/admin/product/${product.slug}`)
    return {

        ok: true
    }
};
