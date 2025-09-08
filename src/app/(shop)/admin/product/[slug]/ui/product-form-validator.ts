import { z } from "zod";

enum Gender {
  men,
  women,
  kid,
  unisex,
}

enum Size {
  XS,
  S,
  M,
  L,
  XL,
  XXL,
  XXXL,
}

export const productSchema = z.object({
  title: z
    .string()
    .min(3, { message: "El título debe tener al menos 3 caracteres" })
    .max(100, { message: "El título no puede superar los 100 caracteres" }),

  slug: z
    .string()
    .min(3, { message: "El slug debe tener al menos 3 caracteres" }),
  description: z
    .string()
    .min(10, { message: "La descripción debe tener al menos 10 caracteres" }),

    inStock: z
    .number({ message: "El stock debe ser un número" })
    .min(0, { message: "El stock debe ser mayor a 0" }),
   

  price: z
    .number({ message: "El precio debe ser un número" })
    .min(0, { message: "El precio debe ser mayor a 0" }),
   

  tags: z.string().min(1, { message: "Debe ingresar al menos un tag" }),
  gender: z.enum(["men", "women", "kid", "unisex"]),

  categoryId: z.string().min(1, { message: "Debe seleccionar una categoría" }),

  sizes: z
    .array(z.string())
    .min(1, { message: "Debe seleccionar al menos una talla" }),
  images: z
    .any()
    .refine((files) => files instanceof FileList && files.length > 0, {
      message: "Debe subir al menos una foto",
    })
    .transform((files) => Array.from(files))
    .pipe(
      z.array(
        z
          .instanceof(File)
          .refine(
            (file) => ["image/jpeg", "image/png"].includes(file.type),
            "Solo se permiten imágenes JPEG o PNG"
          )
          .refine((file) => file.size <= 5 * 1024 * 1024, {
            message: "Cada archivo debe pesar máximo 5MB",
          })
      )
    ),
});

// ✅ Tipo TypeScript para usar en React Hook Form
export type ProductFormData = z.infer<typeof productSchema>;
