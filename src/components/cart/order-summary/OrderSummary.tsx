"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { currencyFormat } from "@/utils";


export const OrderSummary = () => {
  const [loaded, setloaded] = useState(false);

  useEffect(() => {
    setloaded(true);
  }, []);

  const cartStore = useCartStore();

  if (!loaded) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        Cargando...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
      <h2 className="text-2xl mb-2 font-semibold">Resumen de orden</h2>

      <div className="grid grid-cols-2">
        <span>Productos</span>
        <span className="text-right">{cartStore.getTotalItems()} artículos</span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(cartStore.getOrderSummary().subtotal)}</span>

        <span>Impuestos (15%)</span>
        <span className="text-right">{currencyFormat(cartStore.getOrderSummary().tax)}</span>

        <span className="mt-5 text-2xl font-semibold">Total:</span>
        <span className="mt-5 text-2xl text-right font-semibold">
          {currencyFormat(cartStore.getOrderSummary().total)}
        </span>
      </div>

      <div className="mt-5 mb-2 w-full">
        <Link
          className="flex btn-primary justify-center"
          href="/checkout/address"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};
