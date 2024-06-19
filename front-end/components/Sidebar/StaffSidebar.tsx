"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  FaTachometerAlt,
} from "react-icons/fa";
import { IoReceiptSharp } from "react-icons/io5";
import Link from "next/link";


const StaffSidebar = () => {
  const [expandedMenu, setExpandedMenu] = useState("");
  const router = usePathname();

  const toggleSubMenu = (menuId : string) => {
    setExpandedMenu(menuId === expandedMenu ? "" : menuId);
  };

  const isActive = (path : string) => router === path;

  useEffect(() => {
    // Collapse all submenus when the route changes
    setExpandedMenu("");
  }, [router]);

  return (
    <>
      <aside className="sm:w-56 mt-[85px]">
        <div className="h-full w-14 sm:w-56 px-3 py-4 overflow-y-auto bg-gray-100 dark:bg-gray-800 ">
          <ul className="space-y-2 font-medium">
            <li
              className={`rounded-lg ${
                isActive("/staff")
                  ? "bg-white shadow-lg text-blue-900"
                  : "text-gray-700 hover:text-blue-900 dark:text-white hover:bg-white hover:shadow-lg dark:hover:bg-gray-700"
              }`}
            >
              <Link
                href="/staff"
                className="flex items-center p-2 rounded-lg group"
              >
                <FaTachometerAlt size={20} />
                <span className="ms-3 hidden sm:block">Dashboard</span>
              </Link>
            </li>
            <li
              className={`rounded-lg ${
                isActive("/staff/orders") || isActive("/staff/orders/history")
                  ? "bg-white shadow-lg text-blue-900"
                  : "text-gray-700 hover:text-blue-900 dark:text-white hover:bg-white hover:shadow-lg dark:hover:bg-gray-700"
              }`}
            >
              <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                onClick={() => toggleSubMenu("orders")}
              >
                <IoReceiptSharp size={20} />
                <span className="flex-1 ms-3 hidden sm:block text-left rtl:text-right whitespace-nowrap">
                  Orders
                </span>
                <svg
                  className={`w-3 h-3 ml-auto ${
                    expandedMenu === "orders" ? "transform rotate-180" : ""
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {expandedMenu === "orders" && (
                <ul className="py-2 space-y-2">
                  <li>
                    <Link
                      href="/staff/orders"
                      className={`flex items-center w-full p-2 text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${
                        isActive("/staff/orders") ? "bg-gray-200" : ""
                      }`}
                    >
                      Active
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/staff/orders/history"
                      className={`flex items-center w-full p-2 text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${
                        isActive("/staff/orders/history") ? "bg-gray-200" : ""
                      }`}
                    >
                      Order History
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default StaffSidebar;
