"use client";

import { QuantitySelector } from "@/components/product/quantity-selector/QuantitySelector";
import { useCartStore } from "@/store/cart-store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const ProductsInCart = () => {
 
  const [loaded, setloaded] = useState(false);
  const cartStore = useCartStore();

  useEffect(() => {
    setloaded(true)
  }, [])
  

  if(!loaded){
    return  <p>Loading...</p>
  }
  return (
    <>
      {cartStore.cart.map((product) => (
        <div key={product.slug + product.size} className="flex mb-15">
          <Image
            src={`/products/${product.image}`}
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
              onQuantityChange={(quantity) => cartStore.updateProductQuantity(product.id,product.size,quantity)}
            />

            <button className="underline mt-3" onClick={() => cartStore.deleteProductToCart(product.id, product.size)}>Remover</button>
          </div>
        </div>
      ))}
    </>
  );
};
