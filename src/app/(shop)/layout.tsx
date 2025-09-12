import { Footer, SideBar, TopMenu } from "@/components";

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  /*   if(session?.user){
    console.log(session)
    redirect("/");
  }
 */

  return (
    <div >
      <SideBar />
      <main className="min-h-screen grid grid-rows-[auto_1fr_auto] px-1 md:px-[40px]">
        <TopMenu />
        <div className="mb-10">{children}</div>
      
          <Footer />
       
      </main>
    </div>
  );
}
