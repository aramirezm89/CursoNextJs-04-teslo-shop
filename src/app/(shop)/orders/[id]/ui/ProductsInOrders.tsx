"use client";

import { OrderItem, Product } from "@/interfaces";
import { useCartStore } from "@/store/cart-store";
import { currencyFormat } from "@/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  orderProducts: OrderItem[];
}

export const ProductsInOrder = ({ orderProducts }: Props) => {
  const [loaded, setloaded] = useState(false);


  useEffect(() => {
    setloaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {orderProducts.map((orderProduct) => (
        <div key={orderProduct.product.id} className="flex mb-15">
          <Image
            src={`/products/${orderProduct.product.images[0].url}`}
            width={100}
            height={100}
            style={{
              width: "100px",
              height: "100px",
            }}
            alt={orderProduct.product.title}
            className="mr-5 rounded"
          />

          <div className="flex flex-col items-start">
            <p className="font-bold">{orderProduct.product.title} - {orderProduct.size}</p>
            <p>${orderProduct.price} x {orderProduct.quantity}</p>
            <p className="font-bold">Subtotal: {currencyFormat(orderProduct.price * orderProduct.quantity)}</p>
          </div>
        </div>
      ))}
    </>
  );
};
