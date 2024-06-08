"use client";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { BsCalendar } from "react-icons/bs";
import { FaExpandArrowsAlt, FaTachometerAlt } from "react-icons/fa";
import { IoInformationCircleSharp, IoReceiptSharp } from "react-icons/io5";

const Sidebar = () => {
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
      <aside className="sm:w-56 mt-[80px]">
        <div className="h-full px-3 w-14 sm:w-56 py-4 overflow-y-auto bg-gray-100 dark:bg-gray-800 border">
          <ul className="space-y-2 font-medium">
            <li
              className={`rounded-lg ${
                isActive("/customer")
                  ? "bg-white shadow-lg text-blue-900"
                  : "text-gray-700 hover:text-blue-900 dark:text-white hover:bg-white hover:shadow-lg dark:hover:bg-gray-700"
              }`}
            >
              <a
                href="/customer"
                className="flex items-center p-2 rounded-lg group"
              >
                <FaTachometerAlt size={20} />
                <span className="ms-3 hidden sm:block">Dashboard</span>
              </a>
            </li>
            <li
              className={`rounded-lg ${
                isActive("/customer/newConnection")
                  ? "bg-white shadow-lg text-blue-900"
                  : "text-gray-700 hover:text-blue-900 dark:text-white hover:bg-white hover:shadow-lg dark:hover:bg-gray-700"
              }`}
            >
              <a
                href="/customer/newConnection"
                className="flex items-center p-2 rounded-lg group"
              >
                <FaExpandArrowsAlt size={20} />
                <span className="ms-3 hidden sm:block">New Connection</span>
              </a>
            </li>
            <li
              className={`rounded-lg ${
                isActive("/customer/connectionDetails")
                  ? "bg-white shadow-lg text-blue-900"
                  : "text-gray-700 hover:text-blue-900 dark:text-white hover:bg-white hover:shadow-lg dark:hover:bg-gray-700"
              }`}
            >
              <a
                href="/customer/connectionDetails"
                className="flex items-center p-2 rounded-lg group"
              >
                <IoInformationCircleSharp size={20} />
                <span className="ms-3 hidden sm:block">Connection Details</span>
              </a>
            </li>
            <li
              className={`rounded-lg ${
                isActive("/customer/booking") ||
                isActive("/customer/booking/history")
                  ? "bg-white shadow-lg text-blue-900"
                  : "text-gray-700 hover:text-blue-900 dark:text-white hover:bg-white hover:shadow-lg dark:hover:bg-gray-700"
              }`}
            >
              <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                onClick={() => toggleSubMenu("bookings")}
              >
                <BsCalendar size={20} />
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap hidden sm:block">
                  Bookings
                </span>
                <svg
                  className={`w-3 h-3 ml-auto ${
                    expandedMenu === "bookings" ? "transform rotate-180" : ""
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
              {expandedMenu === "bookings" && (
                <ul className="py-2 space-y-2">
                  <li>
                    <a
                      href="/customer/booking"
                      className={`flex items-center w-full p-2 text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${
                        isActive("/customer/booking") ? "bg-gray-200" : ""
                      }`}
                    >
                      Book Cylinder
                    </a>
                  </li>

                  <li>
                    <a
                      href="/customer/booking/history"
                      className={`flex items-center w-full p-2 text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${
                        isActive("/customer/booking/history")
                          ? "bg-gray-200"
                          : ""
                      }`}
                    >
                      Booking History
                    </a>
                  </li>
                </ul>
              )}
            </li>
            <li
              className={`rounded-lg ${
                isActive("/customer/orders")
                  ? "bg-white shadow-lg text-blue-900"
                  : "text-gray-700 hover:text-blue-900 dark:text-white hover:bg-white hover:shadow-lg dark:hover:bg-gray-700"
              }`}
            >
              <a
                href="/customer/orders"
                className="flex items-center p-2 rounded-lg group"
              >
                <IoReceiptSharp size={20} />
                <span className="flex-1 ms-3 hidden sm:block text-left rtl:text-right whitespace-nowrap">
                  Track Booking
                </span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
