"use client";

import { placeOrder } from "@/actions";
import { useAdressStore } from "@/store/adress-store";
import { useCartStore } from "@/store/cart-store";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const PlaceOrder = () => {

  const router = useRouter();
  const cartStore = useCartStore();
  const adressStore = useAdressStore();
  const cart = useCartStore((state) => state.cart);

  const [loaded, setloaded] = useState(false);
  const [error, seterror] = useState("");
  const [isPlacingOrder, setisPlacingOrder] = useState(false);
  useEffect(() => {
    setloaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }

  const onPlaceOrder = async () => {
    setisPlacingOrder(true);

    const productsToOrder = cart.map((product) => ({
      id: product.id,
      quantity: product.quantity,
      size: product.size,
    }));

    const res = await placeOrder(productsToOrder, adressStore.address);
console.log(res);
    if (!res.ok) {
      setisPlacingOrder(false);
      seterror(res.error || "Error al crear la orden");
      return;
    }

    //clean cart

    router.replace('/orders/'+ res.order!.id);
 /*   setTimeout(() => {
    cartStore.clearCart();
   }, 4000); */
  };
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
        <span className="text-right">
          {currencyFormat(cartStore.getOrderSummary().subtotal)}
        </span>

        <span>Impuestos (15%)</span>
        <span className="text-right">
          {currencyFormat(cartStore.getOrderSummary().tax)}
        </span>

        <span className="mt-5 text-2xl font-semibold">Total:</span>
        <span className="mt-5 text-2xl text-right font-semibold">
          {currencyFormat(cartStore.getOrderSummary().total)}
        </span>
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
     <p className="text-red-500 mb-5">{error}</p>
        <button
          className={clsx("flex btn-primary justify-center", {
            "btn-disabled":
              isPlacingOrder || adressStore.address.name.length === 0,
          })}
          onClick={onPlaceOrder}
        >
          Colocar orden
        </button>
      </div>
    </div>
  );
};
