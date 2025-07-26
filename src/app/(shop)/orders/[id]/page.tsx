import Link from "next/link";

import Image from "next/image";

import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import clsx from "clsx";
import { IoCartOutline } from "react-icons/io5";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface Props {
  params: Promise<{ id: string }>;
}
export default async function OrderPage({ params }: Props) {
  const { id } = await params;

  //TODO: verificar si la orden corresponde a un usuario valido
  // redirect(/);

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-full md:w-[1000px]">
        <Title title={`Orden #${id}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <div className="flex flex-col mt-5">
              <div
                className={clsx(
                  "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                  {
                    "bg-red-500": false,
                    "bg-green-500": true,
                  }
                )}
              >
                <IoCartOutline size={30} />
                {/*   <span className="mx-2 ">Pendiente de pago</span> */}
                <span className="mx-2 ">Pagada</span>
              </div>
            </div>

            {/* Items */}
            {productsInCart.map((product) => (
              <div key={product.slug} className="flex mb-15">
                <Image
                  src={`/products/${product.images[0]}`}
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
                  <p>{product.title}</p>
                  <p>${product.price} x 3</p>
                  <p className="font-bold">Subtotal: ${product.price * 3}</p>

                  <button className="underline mt-3">Remover</button>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout - Resumen de orden */}
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl font-semibold  mb-2 ">
              Dirección de entrega
            </h2>
            <div className="mb-10">
              <p className="text-xl">Antonio Ramirez Monsalve</p>
              <p>Jusan Francisco Gonzalez #9133</p>
              <p>Lo espejo</p>
              <p>Santiago</p>
              <p>CP 786876786687</p>
              <p>tel: 867676676</p>
            </div>

            {/*divider */}
            <div className="border-b border-gray-300 my-5 rounded"></div>
            <h2 className="text-2xl mb-2 font-semibold">Resumen de orden</h2>

            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">3 artículos</span>

              <span>Subtotal</span>
              <span className="text-right">$ 100</span>

              <span>Impuestos (15%)</span>
              <span className="text-right">$ 100</span>

              <span className="mt-5 text-2xl font-semibold">Total:</span>
              <span className="mt-5 text-2xl text-right font-semibold">
                $ 100
              </span>
            </div>

            <div className="mt-5 mb-2 w-full">
              <div
                className={clsx(
                  "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                  {
                    "bg-red-500": false,
                    "bg-green-500": true,
                  }
                )}
              >
                <IoCartOutline size={30} />
                {/*   <span className="mx-2 ">Pendiente de pago</span> */}
                <span className="mx-2 ">Pagada</span>
              </div>

            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
