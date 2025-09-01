"use client";

import { PaypalButtons } from "@/components";
import { Order, OrderAdress } from "@/interfaces";
import { currencyFormat } from "@/utils";
import { PayPalButtons } from "@paypal/react-paypal-js";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";

interface Props {
  orderAddress: OrderAdress;
  orderResume: Order;
}

export const ResumeOrder = ({ orderAddress, orderResume }: Props) => {
  const [loaded, setloaded] = useState(false);

  useEffect(() => {
    setloaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
      <h2 className="text-2xl font-semibold  mb-2 ">Dirección de entrega</h2>
      <div className="mb-10">
        <p className="text-xl">
          {`${orderAddress.name} ${orderAddress.lastName}`}
        </p>
        <p>{orderAddress.address}</p>
        <p>{orderAddress.city}</p>

        <p>{orderAddress.zip}</p>
        <p>{orderAddress.phone}</p>
      </div>

      {/*divider */}
      <div className="border-b border-gray-300 my-5 rounded"></div>
      <h2 className="text-2xl mb-2 font-semibold">Resumen de orden</h2>

      <div className="grid grid-cols-2">
        <span>No. Productos</span>
        <span className="text-right">{orderResume.itemsInOrder} artículos</span>

        <span>Subtotal</span>
        <span className="text-right">
          {currencyFormat(orderResume.subtotal)}
        </span>

        <span>Impuestos (15%)</span>
        <span className="text-right">{currencyFormat(orderResume.tax)}</span>

        <span className="mt-5 text-2xl font-semibold">Total:</span>
        <span className="mt-5 text-2xl text-right font-semibold">
          {currencyFormat(orderResume.total)}
        </span>
      </div>

            <div className="mt-5 mb-2 w-full">
{/*               <div
                className={clsx(
                  "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                  {
                    "bg-red-500": !orderResume.isPaid,
                    "bg-green-500": orderResume.isPaid,
                  }
                )}
              >
                <IoCartOutline size={30} />
             
                <span className="mx-2 ">{orderResume.isPaid ? "Pagada" : "Pendiente de pago"}</span>
              </div> */}
                  <PaypalButtons/>
            </div>

        
 
    </div>
  );
};
