import { auth } from "@/auth";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import React from "react";

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }
  return (
    <div>
      <Title title="Perfil" />
      {session.user.emailVerified && new Date(session.user.emailVerified).toLocaleDateString("es-CL")}
   
  
      <pre>{JSON.stringify(session.user, null, 2)}</pre>
    </div>
  );
}
