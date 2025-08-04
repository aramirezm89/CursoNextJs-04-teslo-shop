"use client";

import { getInStockProduct } from "@/actions";
import { titleFont } from "@/config";
import clsx from "clsx";
import { useEffect, useState } from "react";

interface Props {
  slug: string;
}
export const StockLabel = ({ slug }: Props) => {
  const [stock, setstock] = useState<number>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getStock();
  }, []);

  const getStock = async () => {
    const stock = await getInStockProduct(slug);
    setstock(stock);
    setIsLoading(false);
  };

  return (
    <h1
      className={clsx(
        `${titleFont.className} w-100  antialiased font-bold text-xl`,
        isLoading && "bg-gray-200 text-gray-200 animate-pulse"
      )}
    >
      Stock: {stock}
    </h1>
  );
};
