'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useCartStore } from '@/store/cart-store';

export const CartValidator = ({ children }: { children: React.ReactNode }) => {
  const cart = useCartStore((state) => state.cart);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Solo validar en rutas de checkout
    if (!pathname?.startsWith('/checkout')) {
      return;
    }

    if (cart.length === 0) {
      router.replace('/');
    }
  }, [cart, router, pathname]);

  // Si estamos en checkout y el carrito está vacío, no renderizar
  if (pathname?.startsWith('/checkout') && cart.length === 0) {
    return null;
  }

  return <>{children}</>;
};