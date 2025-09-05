import { Title } from "@/components";

import { getUsersAdmin } from "@/actions/admin/users";
import { redirect } from "next/navigation";
import { UsersTable } from "./ui/UsersTable";

interface Props {
  searchParams: Promise<{ page: number; take: number }>;
}
export default async function UsersPage({ searchParams }: Props) {
  const { page, take } = await searchParams;
  const { ok, users = [], totalPages } = await getUsersAdmin({ page, take });


  if (!ok) {
    redirect("/auth/login");
  }

  return (
    <>
      <Title title="Mantenimiento de usuarios" />

      <div className="mb-10">
        <UsersTable users={users} totalPages={totalPages  || 0} />
       
      </div>
    </>
  );
}
