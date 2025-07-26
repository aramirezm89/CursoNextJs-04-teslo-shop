
export default function AuthLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex justify-center ">
      <div className="w-full sm:w-[350px]">{children}</div>
    </main>
  );
}