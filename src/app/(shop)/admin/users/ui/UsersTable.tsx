"use client";

import { changeUserRole } from "@/actions/admin/users";
import { Pagination } from "@/components";
import { User } from "@/interfaces";
import { useMemo, useState } from "react";
import {
  IoChevronDown,
  IoChevronUp,
  IoSwapVertical
} from "react-icons/io5";

interface Props {
  users: User[];
  totalPages: number;
}
export const UsersTable = ({ users, totalPages }: Props) => {
  const [sortName, setSortName] = useState<"asc" | "desc" | null>(null);

  const compareOrdersByPaymentStatus = (
    a: User,
    b: User,
    order: "asc" | "desc"
  ): number => {
    // Comparar nombres primero
    const nameComparison = a.name?.localeCompare(b.name!);
    
    // Si los nombres son iguales, usar el email como criterio secundario
    if (nameComparison === 0) {
      const emailComparison = a.email.localeCompare(b.email);
      return order === "asc" ? emailComparison : -emailComparison;
    }
    
    // Si los nombres son diferentes, ordenar por nombre
    return order === "asc" ? nameComparison! : -nameComparison!;
  };

  const sortedUsers = useMemo(() => {
    if (!sortName) return users;

    return [...users].sort((a, b) => {
      return compareOrdersByPaymentStatus(a, b, sortName);
    });
  }, [users, sortName]);

  const handleSortToggle = () => {
    if (sortName === null) {
      setSortName("asc");
    } else if (sortName === "asc") {
      setSortName("desc");
    } else {
      setSortName(null);
    }
  };


  const [message, setMessage] = useState<string | null>(null);

  const handleChangeUserRole = async (userId: string, role: "ADMIN" | "USER") => {
    const {  message } = await changeUserRole(userId, role);
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };
  return (
    <>
    <p className="text-red-500">{message}</p>
      <table className="min-w-full">
        <thead className="bg-gray-200 border-b">
          <tr>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Email
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              onClick={handleSortToggle}
            >
            <div className="flex items-center gap-2">
          <span>Nombre completo</span>
              {sortName === "asc" && <IoChevronUp className="w-4 h-4" />}
              {sortName === "desc" && <IoChevronDown className="w-4 h-4" />}
              {sortName === null && <IoSwapVertical className="w-4 h-4" />}
            </div>
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left cursor-pointer hover:bg-gray-300 transition-colors"
            >
              <div className="flex items-center gap-2">Role</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr
              key={user.id}
              className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {user.email}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {user.name}
              </td>
              <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <select
                  className="text-sm w-full p-2 text-gray-900 border border-black rounded-md"
                  value={user.role}
                  onChange={(e) => handleChangeUserRole(user.id, e.target.value as "ADMIN" | "USER")}
                >
                  <option  value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
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
