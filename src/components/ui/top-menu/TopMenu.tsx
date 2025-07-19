import { titleFont } from "@/config";
import Link from "next/link";
import React from "react";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";

export const TopMenu = () => {
  return (
    <nav className="flex py-5 justify-between items-center w-full ">
      {/* logo */}

      <div>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>
            Teslo
          </span>
          <span> | Shop</span>
        </Link>
      </div>

      {/*  menu-options */}

      <div className="hidden sm:block">
        <Link
          href="/category/men"
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Hombres
        </Link>
        <Link
          href="/category/women"
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Mujeres
        </Link>
        <Link
          href="/category/kids"
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Niños
        </Link>
      </div>

      {/*   actions */}

      <div className="flex items-center gap-[10px]">
        <Link href="/search" className=" hover:bg-gray-100">
          <IoSearchOutline size={24} />
        </Link>

        <Link  href="/cart" className=" hover:bg-gray-100">
          <div className="relative ">
            <span className="absolute text-xs rounded-full px-1 font-bold top-[-1rem] -right-2 bg-blue-700 text-white">
              10
            </span>
            <IoCartOutline size={24} />
          </div>
        </Link>

        <button className="m-2 p-2 rounded-md transition-all hover:bg-gray-100 cursor-pointer">
          Menu
        </button>
      </div>
    </nav>
  );
};
