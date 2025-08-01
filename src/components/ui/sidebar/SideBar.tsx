"use client";
import { useUiStore } from "@/store/uiStore";
import Link from "next/link";
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearch, IoShirtOutline, IoTicketOutline } from "react-icons/io5";

// SideBar.tsx

export const SideBar = () => {
  const uiStore = useUiStore();

  return (
    <div
      className={`fixed inset-0 z-5 transform transition-transform duration-300 ease-in-out ${
        uiStore.openClose ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Fondo oscuro */}

      <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
      <div className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-blur-sm" onClick={() => uiStore.toogleSidebar()}/>

      {/* Sidebar con animación */}
      <nav
        className={`fixed top-0 right-0 w-full sm:w-[500px] h-screen bg-white z-50 shadow-2xl p-5 `}
      >
        {/* Contenido aquí */}

        <IoCloseOutline
          onClick={() => uiStore.toogleSidebar()}
          size={50}
          className="absolute top-5 right-5 cursor-pointer"
        />

        <div className="relative mt-14">
          <IoSearch size={20} className="absolute top-2  left-1 " />
          <input
            type="text"
            className="w-full bg-gray-50 rounded pl-7 pr-5 py-1 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
            placeholder="Buscar"
          />
        </div>

        <Link
          href="/"
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoPersonOutline size={30} />
          <span className="ml-3 text-xl">Perfil</span>
        </Link>

        <Link
          href="/"
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoTicketOutline size={30} />
          <span className="ml-3 text-xl">Ordenes</span>
        </Link>
        <Link
          href="/"
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoLogInOutline size={30} />
          <span className="ml-3 text-xl">Ingresar</span>
        </Link>
        <Link
          href="/"
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoLogOutOutline size={30} />
          <span className="ml-3 text-xl">Salir</span>
        </Link>

        {/*    separator */}

        <div className="w-full h-px bg-gray-200 my-10" />

        <Link
          href="/"
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoShirtOutline size={30} />
          <span className="ml-3 text-xl">Productos</span>
        </Link>

        <Link
          href="/"
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoTicketOutline size={30} />
          <span className="ml-3 text-xl">Ordenes</span>
        </Link>

        <Link
          href="/"
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoPeopleOutline size={30} />
          <span className="ml-3 text-xl">Usuarios</span>
        </Link>
      </nav>
    </div>
  );
};
