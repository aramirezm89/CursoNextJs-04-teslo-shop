import { Footer, SideBar, TopMenu } from "@/components";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
