import { auth } from "@/auth";
import { Footer, SideBar, TopMenu } from "@/components";
import { redirect } from "next/navigation";

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session = await auth();

  if(!session){
    redirect("/auth/login");
  }
  
  return (
    <div>
      <SideBar />
      <main className="min-h-screen grid grid-rows-[auto_1fr_auto] px-1 md:px-[40px]">
        <TopMenu />
        <div>{children}</div>
      </main>
      <Footer />
    </div>
  );
}
