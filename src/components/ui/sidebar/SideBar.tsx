'use client'
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

// SideBar.tsx
interface SideBarProps {
  isOpen: boolean;
}

export const SideBar = ({ isOpen }: SideBarProps) => {

    const [toggleMenu, setToogleMenu] = useState(isOpen)
  return (
    <div
      className={`fixed inset-0 z-5 transform transition-transform duration-300 ease-in-out ${
        toggleMenu ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Fondo oscuro */}
      {isOpen && (
        <>
          <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
          <div className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-blur-sm" />
        </>
      )}

      {/* Sidebar con animación */}
      <nav
        className={`fixed top-0 right-0 w-[500px] h-screen bg-white z-50 shadow-2xl p-5 `}
      >
        {/* Contenido aquí */}

        <IoCloseOutline
          onClick={() => setToogleMenu(false)}
          size={50}
          className="absolute top-5 right-5 cursor-pointer"
        />
      </nav>
    </div>
  );
};
