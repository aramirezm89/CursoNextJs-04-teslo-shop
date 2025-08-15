"use client";

import { titleFont } from "@/config";
import { useCartStore } from "@/store/cart-store";
import { useUiStore } from "@/store/uiStore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";

export const TopMenu = () => {
  const [loaded, setLoaded] = useState(false);

  const uiStore = useUiStore();
  const cartStore = useCartStore();

  useEffect(() => {
    setLoaded(true);
  }, []);

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
          href="/category/kid"
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

        <Link href={cartStore.getTotalItems() > 0 && loaded? '/cart' : '/empty'} className=" hover:bg-gray-100">
          <div className="relative ">
            <span className="fade-in absolute text-xs rounded-full px-1 font-bold top-[-1rem] -right-2 bg-blue-700 text-white">
              {loaded &&
                cartStore.getTotalItems() > 0 &&
                cartStore.getTotalItems()}
            </span>
            <IoCartOutline size={24} />
          </div>
        </Link>

        <button
          onClick={() => uiStore.toogleSidebar()}
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100 cursor-pointer"
        >
          Menu
        </button>
      </div>
    </nav>
  );
};
