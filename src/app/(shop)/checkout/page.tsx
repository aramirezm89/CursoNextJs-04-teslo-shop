import Link from "next/link";

import Image from "next/image";

import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import { ProductsInCartCheckout } from "./ui/ProductsInCartCheckout";
import { ResumeOrderCheckout } from "./ui/ResumeOrderCheckout";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

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

          <ResumeOrderCheckout />
        </div>
      </div>
    </div>
  );
}
