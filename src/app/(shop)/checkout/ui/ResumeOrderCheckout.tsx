"use client";

import { useAdressStore } from "@/store/adress-store";
import { useCartStore } from "@/store/cart-store";
import { currencyFormat } from "@/utils";
import Link from "next/link";

export const ResumeOrderCheckout = () => {
  const cartStore = useCartStore();

  const adressStore = useAdressStore();
  return (
    <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
      <h2 className="text-2xl font-semibold  mb-2 ">Dirección de entrega</h2>
      <div className="mb-10">
        <p className="text-xl">{adressStore.address.name}</p>
        <p>{adressStore.address.address}</p>
        <p>{adressStore.address.city}</p>

        <p>{adressStore.address.zip}</p>
        <p>{adressStore.address.phone}</p>
      </div>

      {/*divider */}
      <div className="border-b border-gray-300 my-5 rounded"></div>
      <h2 className="text-2xl mb-2 font-semibold">Resumen de orden</h2>

      <div className="grid grid-cols-2">
        <span>No. Productos</span>
        <span className="text-right">{cartStore.cart.length} artículos</span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(cartStore.getOrderSummary().subtotal)}</span>

        <span>Impuestos (15%)</span>
        <span className="text-right">{currencyFormat(cartStore.getOrderSummary().tax)}</span>

        <span className="mt-5 text-2xl font-semibold">Total:</span>
        <span className="mt-5 text-2xl text-right font-semibold">{currencyFormat(cartStore.getOrderSummary().total)}</span>
      </div>

      <div className="mt-5 mb-2 w-full">
        <p className="mb-5">
          <span className="text-xs">
            Al hacer clic en &quot;Colocar orden&quot;, aceptas nuestros{" "}
            <a href="#" className="underline">
              términos y condiciones{" "}
            </a>
            <br /> y{" "}
            <a href="#" className="underline">
              política de privacidad
            </a>
            .
          </span>
        </p>
        <Link className="flex btn-primary justify-center" href="/orders/123">
          Colocar orden
        </Link>
      </div>
    </div>
  );
};
