"use client";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

export const PaypalButtons = () => {
  const [{ isPending }] = usePayPalScriptReducer();

  if(isPending){
    return (
        <div className="animate-pulse flex flex-col gap-2">
            <div className="h-11 bg-gray-300 rounded"></div>
            <div className="h-11 bg-gray-300 rounded"></div>
        </div>
    )
  }
  return (
    <div>
      <PayPalButtons />
    </div>
  );
};
