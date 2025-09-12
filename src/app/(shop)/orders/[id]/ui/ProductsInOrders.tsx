"use client";

import { ProductImage } from "@/components";
import { OrderItem } from "@/interfaces";
import { currencyFormat } from "@/utils";
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
        <div key={orderProduct.product.id + orderProduct.size} className="flex mb-15">
          <ProductImage
            src={orderProduct.product.images[0]?.url}
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
