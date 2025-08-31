"use client";

import { generatePaginationNumbers } from "@/utils";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface Props {
  totalPages: number;
}
export const Pagination = ({ totalPages }: Props) => {

  const pathName = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const allPages = generatePaginationNumbers(currentPage, totalPages);
 
  

  const createPageUrl = (pageNumber: number | string) => {
    //
    const params = new URLSearchParams(searchParams);

    if (pageNumber === "...") {
      return `${pathName}?${params.toString()}`;
    }

    if (Number(pageNumber) <= 0) {
      return `${pathName}`; // return the current path example: / or /kid etc
    }

    if (Number(pageNumber) > totalPages) {
      //when pageNumer is greater than  totalpages return the same pathName
      return `${pathName}?${params.toString()}`;
    }

    params.set("page", pageNumber.toString());

    return `${pathName}?${params.toString()}`;
  };

  return (
    <div className="flex justify-center">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none gap-2">
          <li className="page-item">
            <Link
              className={clsx(
                "page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded  hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                currentPage === 1
                  ? "text-gray-100 pointer-events-none"
                  : "text-gray-800"
              )}
              href={createPageUrl(currentPage - 1)}
              aria-disabled="true"
            >
              <IoChevronBackOutline size={30} />
            </Link>
          </li>

          {allPages.map((pageNumber) => (
            <li key={pageNumber} className="page-item">
              <Link
                className={clsx(
                  "page-link relative block py-1.5 px-3  border-0  outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 focus:shadow-none",
                  currentPage === pageNumber
                    ? "bg-blue-600 text-white shadow-sm hover:bg-blue-700 hover:text-white"
                    : "bg-transparent  hover:bg-gray-200"
                )}
                href={createPageUrl(pageNumber)}
              >
                {pageNumber}
              </Link>
            </li>
          ))}

          {/*        <li className="page-item">
            <Link
              className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href="#"
            >
              1
            </Link>
          </li>
          <li className="page-item active">
            <Link
              className="page-link relative block py-1.5 px-3  border-0 bg-blue-600 outline-none transition-all duration-300 rounded text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md"
              href="#"
            >
              2 <span className="visually-hidden"></span>
            </Link>
          </li>
          <li className="page-item">
            <a
              className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href="#"
            >
              3
            </a>
          </li>

          <li className="page-item">
            <Link
              className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href="#"
            >
              ...
            </Link>
          </li> */}
          <li className="page-item">
            <Link
              href={createPageUrl(currentPage + 1)}
              className={clsx(
                "page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded  hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                currentPage === totalPages
                  ? "text-gray-100 pointer-events-none"
                  : "text-gray-800"
              )}
            >
              <IoChevronForwardOutline size={30} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
