"use client";
import React, { useState, useEffect } from "react";
import { BsCalendar } from "react-icons/bs";
import { FaExpandArrowsAlt, FaTachometerAlt } from "react-icons/fa";
import { IoInformationCircleSharp, IoReceiptSharp } from "react-icons/io5";

const Sidebar = ({ showName,children }: any) => {
  const [expandedMenu, setExpandedMenu] = useState("");
  const [selectedMenuItem, setSelectedMenuItem] = useState("");

  useEffect(() => {
    console.log("Expanded menu:", expandedMenu);
  }, [expandedMenu]);

  const toggleSubMenu = (menuId: string) => {
    setExpandedMenu(menuId === expandedMenu ? "" : menuId);
  };

  const selectMenuItem = (menuId: string) => {
    setSelectedMenuItem(menuId);
  };

  const isMenuItemSelected = (menuId: string) => {
    return selectedMenuItem === menuId;
  };

  return (
    <>
      <div className="flex border z-40 mt-[85px]">
        <aside
          id="sidebar-multi-level-sidebar"
          className="sticky top-[85px] left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 flex-col-2 border"
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-100 dark:bg-gray-800 ">
          <ul className="space-y-2 font-medium">
              <li>
              <a
                  href="/customer/Dashboard"
                  className={`flex items-center p-2 text-gray-700 hover:text-blue-900 rounded-lg dark:text-white group ${
                    isMenuItemSelected("dashboard")
                      ? "bg-gray-200 dark:bg-gray-700"
                      : ""
                  }`}
                  onClick={() => selectMenuItem("dashboard")}
                >
                  <FaTachometerAlt size={20}/>
                  {/* {showName &&*/} <span className="ms-3">Dashboard</span>{/* {} */}
                </a>
              </li>
              <li>
                <a
                  href="/customer/NewConnection"
                  className="flex items-center p-2 text-gray-700 hover:text-blue-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <FaExpandArrowsAlt size={20}/>
                  <span className="ms-3">New Connection</span>
                </a>
              </li>
              <li>
                <a
                  href="/customer/ConnectionDetails"
                  className="flex items-center p-2 text-gray-700 hover:text-blue-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <IoInformationCircleSharp size={20} /> 
                  <span className="ms-3">Connection Details</span>
                </a>
              </li>
              <li>
                <button
                  type="button"
                  className="flex items-center w-full p-2 text-base text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  onClick={() => toggleSubMenu("bookings")}
                >
                  <BsCalendar size={20} />
                  <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
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
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                {expandedMenu === "bookings" && (
                  <ul className="py-2 space-y-2">
                    <li>
                      <a
                        href="/customer/Booking"
                        className="flex items-center w-full p-2 text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Book Cylinder
                      </a>
                    </li>
                    <li>
                      <a
                        href="/customer/Booking/LastBooking"
                        className="flex items-center w-full p-2 text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Last Booking
                      </a>
                    </li>
                    <li>
                      <a
                        href="/customer/Booking/History"
                        className="flex items-center w-full p-2 text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Booking History
                      </a>
                    </li>
                  </ul>
                )}
              </li>
              <li>
              <a
                  href="/customer/OrderSummary"
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
        <div className="flex-col flex-col-11 w-full overflow-y-auto mb-10">
          {children}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
