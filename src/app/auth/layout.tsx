import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
 children
}: {
 children: React.ReactNode;
}) {

const session =  await auth();

  if(session?.user){
    redirect("/");
  }
 
  return (
    <main className="min-h-screen flex justify-center ">
      <div className="w-full p-5 sm:p-0 sm:w-[350px]">{children}</div>
    </main>
  );
}