
export default function AuthLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
  <main className="bg-red-500">
    {children}
  </main>
  );
}