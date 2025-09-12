"use client";

import { ProductImage } from "@/components";
import { useCartStore } from "@/store/cart-store";
import { currencyFormat } from "@/utils";
import { useEffect, useState } from "react";

export const ProductsInCartCheckout = () => {
  const [loaded, setloaded] = useState(false);
  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    setloaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {cart.map((product) => (
        <div key={product.slug + product.size} className="flex mb-15">
          <ProductImage
            src={product.image?.url}
            width={100}
            height={100}
            style={{
              width: "100px",
              height: "100px",
            }}
            alt={product.title}
            className="mr-5 rounded"
          />

          <div className="flex flex-col items-start">
            <p className="font-bold">{product.title} - {product.size}</p>
            <p>${product.price} x {product.quantity}</p>
            <p className="font-bold">Subtotal: {currencyFormat(product.price * product.quantity)}</p>
          </div>
        </div>
      ))}
    </>
  );
};
