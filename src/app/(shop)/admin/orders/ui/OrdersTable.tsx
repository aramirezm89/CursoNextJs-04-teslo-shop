"use client";

import { Pagination } from "@/components";
import Link from "next/link";
import React, { useState, useMemo } from "react";
import { IoCardOutline, IoChevronUp, IoChevronDown, IoSwapVertical } from "react-icons/io5";

export interface OrderCom {
  id: string;
  subtotal: number;
  tax: number;
  total: number;
  itemsInOrder: number;
  isPaid: boolean;
  paidAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  transactionId: string | null;
  orderAddress: OrderAddress | null;
}

export interface OrderAddress {
  name: string;
  lastName: string;
  country: Country;
}

export interface Country {
  id: string;
  name: string;
}

interface Props {
  orderCom: OrderCom[];
  totalPages: number;
}

export const OrdersTable = ({ orderCom, totalPages }: Props) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

  const compareOrdersByPaymentStatus = (
    a: OrderCom,
    b: OrderCom,
    order: "asc" | "desc"
  ): number => {
    if (a.isPaid === b.isPaid) {
      return 0;
    }

    if (order === "asc") {
      return a.isPaid ? 1 : -1;
    } else {
      return a.isPaid ? -1 : 1;
    }
  };

  const sortedOrders = useMemo(() => {
    if (!sortOrder) return orderCom;

    return [...orderCom].sort((a, b) => {
      return compareOrdersByPaymentStatus(a, b, sortOrder);
    });
  }, [orderCom, sortOrder]);

  const handleSortToggle = () => {
    if (sortOrder === null) {
      setSortOrder("asc");
    } else if (sortOrder === "asc") {
      setSortOrder("desc");
    } else {
      setSortOrder(null);
    }
  };

  return (
    <>
      <table className="min-w-full">
        <thead className="bg-gray-200 border-b">
          <tr>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              #ID
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Nombre completo
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left cursor-pointer hover:bg-gray-300 transition-colors"
              onClick={handleSortToggle}
            >
              <div className="flex items-center gap-2">
                Estado
                {sortOrder === "asc" && <IoChevronUp className="w-4 h-4" />}
                {sortOrder === "desc" && <IoChevronDown className="w-4 h-4" />}
                {sortOrder === null && <IoSwapVertical className="w-4 h-4" />}
              </div>
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Opciones
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedOrders.map((orderCom) => (
            <tr
              key={orderCom.id}
              className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {orderCom.id}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {orderCom.orderAddress?.name} {orderCom.orderAddress?.lastName}
              </td>
              <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {orderCom.isPaid ? (
                  <>
                    <IoCardOutline className="text-red-800" />
                    <span className="mx-2 text-red-800">No Pagada</span>
                  </>
                ) : (
                  <>
                    <IoCardOutline className="text-green-800" />
                    <span className="mx-2 text-green-800">Pagada</span>
                  </>
                )}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 ">
                <Link
                  href={`/orders/${orderCom.id}`}
                  className="hover:underline"
                >
                  Ver orden
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-10">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
};
