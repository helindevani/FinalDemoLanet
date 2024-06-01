"use client";
import React, { useState, useEffect } from "react";
import {
  FaExpandArrowsAlt,
  FaTachometerAlt,
  FaUserFriends,
  FaMoneyBillAlt,
  FaChartBar,
  FaCog,
} from "react-icons/fa";
import { FaRegChartBar, FaUser } from "react-icons/fa6";
import { BiCylinder, BiListCheck } from "react-icons/bi";
import { IoReceiptSharp } from "react-icons/io5";

const StaffSidebar = () => {
  const [expandedMenu, setExpandedMenu] = useState("");


  const toggleSubMenu = (menuId: string) => {
    setExpandedMenu(menuId === expandedMenu ? "" : menuId);
  };
  return (
    <>
        <aside className="sm:w-56 mt-[80px]" 
        >
          <div className="h-full w-14 sm:w-56 px-3 py-4 overflow-y-auto bg-gray-100 dark:bg-gray-800 ">
            <ul className="space-y-2 font-medium">
              <li>
                <a
                  href="/staff"
                  className="flex items-center p-2 text-gray-700 hover:text-blue-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <FaTachometerAlt size={20} />
                  <span className="ms-3 hidden sm:block">Dashboard</span>
                </a>
              </li>
              <li>
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
                      expandedMenu === "orders"
                        ? "transform rotate-180"
                        : ""
                    }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                {expandedMenu === "orders" && (
                  <ul className=" py-2 space-y-2">
                    <li>
                      <a
                        href="/staff/orders"
                        className="flex items-center w-full p-2 text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Active
                      </a>
                    </li>

                    <li>
                      <a
                        href="/staff/orders/history"
                        className="flex items-center w-full p-2 text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Order History
                      </a>
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
