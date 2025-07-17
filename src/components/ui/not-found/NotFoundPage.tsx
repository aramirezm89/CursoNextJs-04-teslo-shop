import { titleFont } from "@/config";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col-reverse md:flex-row h-full w-full justify-center items-center px-5">
      <div className="text-center ">
        <h2 className={`${titleFont.className}  antialiased text-9xl`}>404</h2>
        <p className="font-semibold text-xl">Whoops! Lo sentimos mucho..</p>
        <p className="font-light">
          <span>Puedes regresar al </span>
          <Link
            href="/"
            className="font-medium hover:underline hover:font-bold transition-all"
          >
            Home
          </Link>
        </p>
      </div>

      <div className="">
        <Image src="/imgs/starman_750x750.png" width={550} height={550} alt="starman"/>

      </div>
    </div>
  );
}
