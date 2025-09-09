"use client";

import { CategoryEntity, Product } from "@/interfaces";
import { useForm } from "react-hook-form";
import { ProductFormData, productSchema } from "./product-form-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { Size } from "../../../../../../../generated/prisma";
import Image from "next/image";
import { createUpdateProduct } from "@/actions";

interface Props {
  product: Product | undefined | null;
  categories: CategoryEntity[];
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export const ProductForm = ({ product, categories }: Props) => {
  const defaultValues = product
    ? {
        ...product,
        tags: product.tags.join(","),
        sizes: product.sizes ?? [],
        //todo: images
      }
    : {};
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    getValues,
    watch,
  } = useForm<ProductFormData>({
    defaultValues: defaultValues,
    resolver: zodResolver(productSchema),
  });

  watch("sizes");

  const onSizeChange = (size: Size) => {
    const sizes = getValues("sizes") || [];

    if (sizes.includes(size)) {
      return setValue(
        "sizes",
        sizes.filter((s) => s !== size),
        {
          shouldValidate: true,
        }
      );
    }
    return setValue("sizes", [...sizes, size], {
      shouldValidate: true,
    });
  };

  const onSubmit = async (data: ProductFormData) => {
    console.log(data);
    const { images, ...productData } = data;

    const formData = new FormData();
    Object.entries(productData).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    formData.append("id", product?.id ?? "");
    const { ok } = await createUpdateProduct(formData);

    console.log(ok);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
    >
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Título</span>
          <input
            autoFocus
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("slug")}
          />
          {errors.slug && (
            <p className="text-red-500 text-sm">{errors.slug.message}</p>
          )}
        </div>

        <div className="flex flex-col mb-2">
          <span>Descripción</span>
          <textarea
            rows={5}
            className="p-2 border rounded-md bg-gray-200"
            {...register("description")}
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div className="flex flex-col mb-2">
          <span>En stock</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register("inStock", { valueAsNumber: true })}
          />
          {errors.inStock && (
            <p className="text-red-500 text-sm">{errors.inStock.message}</p>
          )}
        </div>

        <div className="flex flex-col mb-2">
          <span>Precio</span>
          <input
            type="number"
            step="0.01"
            className="p-2 border rounded-md bg-gray-200"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("tags")}
          />
          {errors.tags && (
            <p className="text-red-500 text-sm">{errors.tags.message}</p>
          )}
        </div>

        <div className="flex flex-col mb-2">
          <span>Gender</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register("gender")}
          >
            <option value="">[Seleccione]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm">{errors.gender.message}</p>
          )}
        </div>

        <div className="flex flex-col mb-2">
          <span>Categoria</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register("categoryId")}
          >
            <option value="">[Seleccione]</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="text-red-500 text-sm">{errors.categoryId.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className={clsx(" w-full", {
            "btn-disabled": !isValid,
            "btn-primary": isValid,
          })}
        >
          Guardar
        </button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className="w-full">
        {/* As checkboxes */}
        <div className="flex flex-col">
          <span>Tallas</span>
          <div className="flex flex-wrap">
            {sizes.map((size) => (
              // bg-blue-500 text-white <--- si está seleccionado
              <button
                type="button"
                key={size}
                onClick={() => onSizeChange(size as Size)}
                className={clsx(
                  "flex items-center justify-center w-10 h-10 mr-2 border rounded-md transition-all cursor-pointer",
                  {
                    "bg-blue-500 text-white": getValues("sizes")?.includes(
                      size as Size
                    ),
                  }
                )}
              >
                <span>{size}</span>
              </button>
            ))}
            {errors.sizes && (
              <p className="text-red-500 text-sm">{errors.sizes.message}</p>
            )}
          </div>

          <div className="flex flex-col mb-2">
            <span>Fotos</span>
            <input
              type="file"
              multiple
              className="p-2 border rounded-md bg-gray-200"
              accept="image/png, image/jpeg"
              {...register("images")}
            />
            {errors.images && (
              <p className="text-red-500 text-sm">{errors.images.message}</p>
            )}
          </div>

          <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2">
            {product?.images.map((image) => (
              <div key={image.id}>
                <Image
                  className="w-full h-full object-cover rounded-t-xl"
                  src={`/products/${image.url}`}
                  alt={product.title}
                  width={200}
                  height={200}
                />

                <button
                  onClick={() => console.log(image.id, image.url)}
                  type="button"
                  className="btn-danger w-full rounded-b-xl"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};
