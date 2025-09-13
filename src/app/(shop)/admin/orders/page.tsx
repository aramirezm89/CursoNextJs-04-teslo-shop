import { getOrdersAdmin } from "@/actions";
import { Title } from "@/components";

import { redirect } from "next/navigation";
import { OrdersTable } from "./ui/OrdersTable";

interface Props {
  searchParams: Promise<{ page: number; take: number }>;
}
export default async function OrdersPage({ searchParams }: Props) {
  const { page, take } = await searchParams;
  const { ok, orders = [], totalPages } = await getOrdersAdmin({ page, take });

  console.log(orders,"orders desde ka pagina");

  if (!ok) {
    redirect("/auth/login");
  }

  return (
    <>
      <Title title="Orders" />

      <div className="mb-10">
        <OrdersTable orderCom={orders} totalPages={totalPages  || 0} />
       
      </div>
    </>
  );
}
