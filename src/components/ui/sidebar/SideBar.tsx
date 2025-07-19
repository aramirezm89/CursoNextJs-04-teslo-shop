'use client'
import { useUiStore } from "@/store/uiStore";

import { IoCloseOutline, IoSearch } from "react-icons/io5";

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
     
        <>
          <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
          <div className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-blur-sm" />
        </>
   

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
              placeholder=" "
            />
     
        </div>
      </nav>
    </div>
  );
};
