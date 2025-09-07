"use client";

import { Pagination } from "@/components";
import { Product } from "@/interfaces";
import { currencyFormat } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useMemo } from "react";
import {
  IoCardOutline,
  IoChevronUp,
  IoChevronDown,
  IoSwapVertical,
} from "react-icons/io5";

interface Props {
  products: Product[];
  totalPages: number;
}

export const ProductsTable = ({ products, totalPages }: Props) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

  const compareOrdersByPaymentStatus = (
    a: Product,
    b: Product,
    order: "asc" | "desc"
  ): number => {
    if (a.title === b.title) {
      return 0;
    }

    if (order === "asc") {
      return a.title > b.title ? 1 : -1;
    } else {
      return a.title > b.title ? -1 : 1;
    }
  };

  const sortedProducts = useMemo(() => {
    if (!sortOrder) return products;

    return [...products].sort((a, b) => {
      return compareOrdersByPaymentStatus(a, b, sortOrder);
    });
  }, [products, sortOrder]);

  const handleSortToggle = () => {
    if (sortOrder === null) {
      setSortOrder("asc");
    } else if (sortOrder === "asc") {
      setSortOrder("desc");
    } else {
      setSortOrder(null);
    }
  };

  return (
    <>
      <table className="min-w-full">
        <thead className="bg-gray-200 border-b" >
          <tr>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Image
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              onClick={handleSortToggle}
            >
              <div className="flex items-center gap-2">
                Titulo
                {sortOrder === "asc" && <IoChevronUp className="w-4 h-4" />}
                {sortOrder === "desc" && <IoChevronDown className="w-4 h-4" />}
                {sortOrder === null && <IoSwapVertical className="w-4 h-4" />}
              </div>
            </th>

            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Precio
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Género
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Stock
            </th>
            <th
              scope="col"
              className=" text-sm font-medium text-gray-900 px-6 py-4 text-left "
            >
              Sizes
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product) => (
            <tr
              key={product.id}
              className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <Link href={`/product/${product.slug}`}>
                  <Image
                    className="w-20 h-20 object-cover rounded"
                    src={`/products/${product.images[0]}`}
                    alt={product.title}
                    width={50}
                    height={50}
                  />
                </Link>
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <Link className="hover:underline hover:font-bold" href={`/admin/product/${product.slug}`}>
                  {product.title}
                </Link>
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {currencyFormat(product.price)}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {product.gender}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {product.inStock}
              </td>

              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {product.sizes.join(", ")}
              </td>
       
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-10">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
};
