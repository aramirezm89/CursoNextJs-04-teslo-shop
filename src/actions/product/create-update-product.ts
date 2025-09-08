'use server';

import { z } from "zod";

const productSchema = z.object({
    id: z.uuid("El ID debe ser un UUID válido").optional().nullable(),
    title: z.string().min(2, "El titulo debe tener al menos 2 caracteres").max(100, "El titulo debe tener menos de 100 caracteres"),
    slug: z.string().min(2, "El slug debe tener al menos 2 caracteres").max(100, "El slug debe tener menos de 100 caracteres"),
    description: z.string().min(2, "La descripción debe tener al menos 2 caracteres"),
    price: z.coerce.number().min(0, "El precio debe ser mayor a 0").transform((value) => Number(value.toFixed(2))),
    inStock: z.coerce.number().min(0, "El stock debe ser mayor a 0").transform((value) => Number(value.toFixed)),
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
 
    console.log(productParsed.data)
    return {
        form: formData ,
        ok: true
    }
};
