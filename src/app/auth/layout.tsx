import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
 children
}: {
 children: React.ReactNode;
}) {

  const session =  await auth();
  console.log("session", session);
  if(session){
    redirect("/");
  }

  return (
    <main className="min-h-screen flex justify-center ">
      <div className="w-full sm:w-[350px]">{children}</div>
    </main>
  );
}