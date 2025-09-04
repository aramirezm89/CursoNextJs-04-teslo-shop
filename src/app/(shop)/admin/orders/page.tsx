import { getOrdersAdmin } from "@/actions";
import { Pagination, Title } from "@/components";

import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";
import { OrdersTable } from "./ui/OrdersTable";

interface Props {
  searchParams: Promise<{ page: number; take: number }>;
}
export default async function OrdersPage({ searchParams }: Props) {
  const { page, take } = await searchParams;
  const { ok, orders = [], totalPages } = await getOrdersAdmin({ page, take });
  console.log(orders);

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
