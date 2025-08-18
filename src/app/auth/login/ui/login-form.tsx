"use client";

import { authenticate } from "@/actions";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { IoInformationOutline } from "react-icons/io5";

export const LoginForm = () => {
  /*     const credentialsAction = (formData: FormData) => {
        signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
        })
      }
 */
  const router = useRouter();
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  const { update } = useSession();

  useEffect(() => {
    if (errorMessage === "success") {
      console.log("success");
      update();
      router.replace("/");
    }
  }, [errorMessage]);

  return (
    <form className="flex flex-col" action={formAction}>
      <label htmlFor="email">Correo electrónico</label>
      <input
        name="email"
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
      />

      <label htmlFor="password">Contraseña</label>
      <input
        name="password"
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password"
      />
      {errorMessage !== "success" && errorMessage !== undefined && (
        <div className="flex items-center gap-2 mb-5">
          <IoInformationOutline size={20} className="text-red-500" />
          <p className="text-red-500">Credenciales incorrectas</p>
        </div>
      )}
      <button
        disabled={isPending}
        type="submit"
        className={clsx(
          isPending
            ? "btn-disabled cursor-not-allowed"
            : "btn-primary cursor-pointer"
        )}
      >
        {isPending ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
};
