import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { CartValidator } from "./ui/CartValidator";

export default async function CheckoutLayout({
 children
}: {
 children: React.ReactNode;
}) {

  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }
  
  return (
    <CartValidator>
      <div>{children}</div>
    </CartValidator>
  );
}