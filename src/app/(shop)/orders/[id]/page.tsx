import { getOrderById } from "@/actions";
import { Title } from "@/components";
import clsx from "clsx";
import { redirect } from "next/navigation";
import { IoCartOutline } from "react-icons/io5";
import { ClearCart } from './ui/CleanCart';
import { ProductsInOrder } from "./ui/ProductsInOrders";
import { ResumeOrder } from "./ui/ResumeOrder";

interface Props {
  params: Promise<{ id: string }>;
}
export default async function OrderPage({ params }: Props) {

  const { id } = await params;

  const { ok, order } = await getOrderById(id);

  //verificar si la orden corresponde a un usuario valido

  if (!ok) {
    redirect("/");
  }

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
                    "bg-red-500": !order?.isPaid,
                    "bg-green-500": order?.isPaid,
                  }
                )}
              >
                <IoCartOutline size={30} />
                {/*   <span className="mx-2 ">Pendiente de pago</span> */}
                <span className="mx-2 ">
                  {order?.isPaid ? "Pagada" : "Pendiente de pago"}
                </span>
              </div>
            </div>

            {/* Items */}

            <ProductsInOrder orderProducts={order!.orderItems} />
          </div>

          {/* Checkout - Resumen de orden */}
          <ResumeOrder
            orderAddress={order!.orderAddress!}
            orderResume={order!}
          />
          <ClearCart />
        </div>
      </div>
    </div>
  );
}
