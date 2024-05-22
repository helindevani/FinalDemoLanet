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

const StaffSidebar = ({ children }: any) => {
  const [expandedMenu, setExpandedMenu] = useState("");

  useEffect(() => {
    console.log("Expanded menu:", expandedMenu);
  }, [expandedMenu]);

  const toggleSubMenu = (menuId: string) => {
    setExpandedMenu(menuId === expandedMenu ? "" : menuId);
  };
  return (
    <>
      <div className="flex border z-40 w-full mt-[85px]">
        <aside
          id="sidebar-multi-level-sidebar"
          className="sticky left-0 z-40 sm:w-64  w-5 h-auto transition-transform -translate-x-full sm:translate-x-0 flex-col-2 border"
          aria-label="Sidebar"
        >
          <div className="h-full w-full px-3 py-4 overflow-y-auto bg-gray-100 dark:bg-gray-800 ">
            <ul className="space-y-2 font-medium">
              <li>
                <a
                  href="/staff"
                  className="flex items-center p-2 text-gray-700 hover:text-blue-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <FaTachometerAlt size={20} />
                  <span className="ms-3">Dashboard</span>
                </a>
              </li>
              <li>
              <a
                  href="/staff/orders"
                  type="button"
                  className="flex items-center w-full p-2 text-base text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                 
                >
                  <IoReceiptSharp size={20} /> 
                  <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                    Orders
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </aside>
        <div className="w-full">{children}</div>
      </div>
    </>
  );
};

export default StaffSidebar;
