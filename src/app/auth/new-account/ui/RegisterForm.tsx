"use client";
import { login, registerUser } from "@/actions/auth/auth-actions";
import { newAccountInputs } from "@/actions/auth/interfaces/auth";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export const RegisterForm = () => {
  const { update } = useSession();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<newAccountInputs>();

  const [errorMessage, seterrorMessage] = useState("");
  const onSubmit: SubmitHandler<newAccountInputs> = async (data) => {
    seterrorMessage("");
    const res = await registerUser(data);

    if (!res.ok) {
      seterrorMessage(res.error);
      return;
    }

    if (res.ok) {
      const resSignIn = await login(data.email.toLowerCase(), data.password);

      if (resSignIn.ok) {
        update();
        router.replace("/");
      }
    }

    console.log(res);
  };
  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Nombre completo</label>
      <input
        className={clsx(
          "px-5 py-2 border bg-gray-200 rounded mb-2",
          errors.name && "border-red-500"
        )}
        type="text"
        autoComplete="name"
        autoFocus
        {...register("name", { required: true })}
      />

      {errors.name && (
        <span className="text-red-600 text-xs mb-2">Campo requerido</span>
      )}

      <label htmlFor="email">Correo electrónico</label>
      <input
        className={clsx(
          "px-5 py-2 border bg-gray-200 rounded mb-2",
          errors.email?.type === "required" && "border-red-500",
          errors.email?.type === "pattern" && "border-red-500"
        )}
        type="email"
        autoComplete="email"
        {...register("email", {
          required: true,
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        })}
      />
      {errors.email?.type === "required" && (
        <span className="text-red-600 text-xs mb-2">Campo requerido</span>
      )}
      {errors.email?.type === "pattern" && (
        <span className="text-red-600 text-xs mb-2">Email no valido</span>
      )}
      <label htmlFor="password">Contraseña</label>
      <input
        className={clsx(
          "px-5 py-2 border bg-gray-200 rounded mb-2",
          errors.password && "border-red-500"
        )}
        type="password"
        autoComplete="new-password"
        {...register("password", { required: true })}
      />

      {errors.password && (
        <span className="text-red-600 text-xs mb-2">Campo requerido</span>
      )}

      <p className="text-red-600 text-xs mb-2">{errorMessage}</p>
      <button className="btn-primary mt-5">Crear cuenta</button>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        Ingresar
      </Link>
    </form>
  );
};
