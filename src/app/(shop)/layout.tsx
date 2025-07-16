import { TopMenu } from "@/components";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen grid grid-rows-[auto_1fr] ">
      <TopMenu />
      <div>{children}</div>
    </main>
  );
}
