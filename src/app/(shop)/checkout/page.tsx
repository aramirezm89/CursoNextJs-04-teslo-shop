import Link from "next/link";


import { Title } from "@/components";
import { PlaceOrder } from "./ui/PlaceOrder";
import { ProductsInCartCheckout } from "./ui/ProductsInCartCheckout";


export default function CheckoutPage() {
  // redirect('/empty');

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-full md:w-[1000px]">
        <Title title="Verificar orden" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Ajustar elementos</span>
            <Link href="/cart" className="underline mb-5">
              Editar carrito
            </Link>

            {/* Items */}

            <ProductsInCartCheckout />
          </div>

          {/* Checkout - Resumen de orden */}

          <PlaceOrder />
        </div>
      </div>
    </div>
  );
}
