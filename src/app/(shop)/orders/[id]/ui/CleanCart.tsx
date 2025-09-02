"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cart-store"; // tu store de zustand

export function ClearCart() {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return null; // no renderiza nada, solo ejecuta el efecto
}