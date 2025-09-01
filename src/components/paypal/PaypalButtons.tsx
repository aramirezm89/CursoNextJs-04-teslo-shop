"use client";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { CreateOrderData, CreateOrderActions } from "@paypal/paypal-js";
import { setTransactionId } from "@/actions";

interface Props {
  orderId: string;
  amount: number;
}
export const PaypalButtons = ({ orderId, amount }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();
  const roundedAmount = Math.round(amount * 100) / 100;

  if (isPending) {
    return (
      <div className="animate-pulse flex flex-col gap-2">
        <div className="h-11 bg-gray-300 rounded"></div>
        <div className="h-11 bg-gray-300 rounded"></div>
      </div>
    );
  }

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ) => {
    const transactionId = await actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          /*    invoice_id: "123456", */
          amount: {
            currency_code: "USD",
            value: roundedAmount.toString(),
          },
        },
      ],
    });

    const {ok, order, message} = await setTransactionId(orderId, transactionId);

    if(!ok){
      console.log(message);
      throw new Error(message);
    }

    console.log("transactionId", transactionId);
    console.log("order", order);
    return transactionId;
  };

  const onApprove = async () => {};
  return (
    <div>
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </div>
  );
};
