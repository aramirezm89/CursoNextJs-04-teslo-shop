"use client";

import { QuantitySelector } from "@/components/product/quantity-selector/QuantitySelector";
import { useCartStore } from "@/store/cart-store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {  ProductImage } from "@/components";

export const ProductsInCart = () => {
 
  const [loaded, setloaded] = useState(false);
  const cart = useCartStore((state) => state.cart);
  const updateProductQuantity = useCartStore((state) => state.updateProductQuantity);
  const deleteProductToCart = useCartStore((state) => state.deleteProductToCart);

  useEffect(() => {
    setloaded(true)
  }, [])
  

  if(!loaded){
    return  <p>Loading...</p>
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
            <Link className="cursor-pointer hover:underline hover:font-bold" href={`/product/${product.slug}`}>{`${product.title} - ${product.size}`}</Link>
            <p>${product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChange={(quantity) => updateProductQuantity(product.id,product.size,quantity)}
            />

            <button className="underline mt-3 cursor-pointer" onClick={() => deleteProductToCart(product.id, product.size)}>Remover</button>
          </div>
        </div>
      ))}
    </>
  );
};
