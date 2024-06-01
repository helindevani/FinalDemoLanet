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

const AdminSidebar = () => {
  const [expandedMenu, setExpandedMenu] = useState("");

  const toggleSubMenu = (menuId: string) => {
    setExpandedMenu(menuId === expandedMenu ? "" : menuId);
  };
  return (
    <>
        <aside className="sm:w-56 mt-[80px]"
        >
          <div className="h-full px-3 w-14 sm:w-56 py-4 overflow-y-auto bg-gray-100 dark:bg-gray-800 ">
            <ul className="space-y-2 font-medium">
              <li>
                <a
                  href="/admin"
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
                  onClick={() => toggleSubMenu("consumer")}
                >
                  <FaUser size={20} />
                  <span className="flex-1 ms-3 text-left hidden sm:block rtl:text-right whitespace-nowrap">
                    Delivery Staff
                  </span>
                  <svg
                    className={`w-3 h-3 ml-auto ${
                      expandedMenu === "consumer" ? "transform rotate-180" : ""
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
                {expandedMenu === "consumer" && (
                  <ul className="py-2 space-y-2">
                    <li>
                      <a
                        href="/admin/staff"
                        className="flex items-center w-full p-2 text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Add Staff
                      </a>
                    </li>
                    <li>
                      <a
                        href="/admin/staff/manage"
                        className="flex items-center w-full p-2 text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Manage Staff
                      </a>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <button
                  type="button"
                  className="flex items-center w-full p-2 text-base text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  onClick={() => toggleSubMenu("supplier")}
                >
                  <FaUserFriends size={20} />
                  <span className="flex-1 ms-3 hidden sm:block text-left rtl:text-right whitespace-nowrap">
                    Supplier
                  </span>
                  <svg
                    className={`w-3 h-3 ml-auto ${
                      expandedMenu === "supplier" ? "transform rotate-180" : ""
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
                {expandedMenu === "supplier" && (
                  <ul className="py-2 space-y-2">
                    <li>
                      <a
                        href="/admin/supplier"
                        className="flex items-center w-full p-2 text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Add Supplier
                      </a>
                    </li>
                    <li>
                      <a
                        href="/admin/supplier/manage"
                        className="flex items-center w-full p-2 text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Manage Supplier
                      </a>
                    </li>
                    
                  </ul>
                )}
              </li>
              <li>
                <button
                  type="button"
                  className="flex items-center w-full p-2 text-base text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  onClick={() => toggleSubMenu("categories")}
                >
                  <BiListCheck size={20} />
                  <span className="flex-1 ms-3 hidden sm:block text-left rtl:text-right whitespace-nowrap">
                    Categories
                  </span>
                  <svg
                    className={`w-3 h-3 ml-auto ${
                      expandedMenu === "categories"
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
                {expandedMenu === "categories" && (
                  <ul className=" py-2 space-y-2">
                    <li>
                      <a
                        href="/admin/categories"
                        className="flex items-center w-full p-2 text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Add Categories
                      </a>
                    </li>
                    <li>
                      <a
                        href="/admin/categories/manage"
                        className="flex items-center w-full p-2 text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Manage Categories
                      </a>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <button
                  type="button"
                  className="flex items-center w-full p-2 text-base text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  onClick={() => toggleSubMenu("cylinder")}
                >
                  <BiCylinder size={20} />
                  <span className="flex-1 ms-3 hidden sm:block text-left rtl:text-right whitespace-nowrap">
                    Cylinder
                  </span>
                  <svg
                    className={`w-3 h-3 ml-auto ${
                      expandedMenu === "cylinder" ? "transform rotate-180" : ""
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
                {expandedMenu === "cylinder" && (
                  <ul className="py-2 space-y-2">
                    <li>
                      <a
                        href="/admin/cylinder"
                        className="flex items-center w-full p-2 text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Add Cylinder
                      </a>
                    </li>
                    <li>
                      <a
                        href="/admin/cylinder/manage"
                        className="flex items-center w-full p-2 text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Manage Cylinders
                      </a>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <button
                  type="button"
                  className="flex items-center w-full p-2 text-base text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  onClick={() => toggleSubMenu("connections")}
                >
                  <FaExpandArrowsAlt size={20} />
                  <span className="flex-1 ms-3 hidden sm:block text-left rtl:text-right whitespace-nowrap">
                    Connections
                  </span>
                  <svg
                    className={`w-3 h-3 ml-auto ${
                      expandedMenu === "connections"
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
                {expandedMenu === "connections" && (
                  <ul className=" py-2 space-y-2">
                    <li>
                      <a
                        href="/admin/connection"
                        className="flex items-center w-full p-2 text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        New
                      </a>
                    </li>

                    <li>
                      <a
                        href="/admin/connection/approved"
                        className="flex items-center w-full p-2 text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Approved
                      </a>
                    </li>
                    <li>
                      <a
                        href="/admin/connection/rejected"
                        className="flex items-center w-full p-2 text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Rejected
                      </a>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <button
                  type="button"
                  className="flex items-center w-full p-2 text-base text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  onClick={() => toggleSubMenu("bookings")}
                >
                  <FaMoneyBillAlt size={20} />
                  <span className="flex-1 ms-3 hidden sm:block text-left rtl:text-right whitespace-nowrap">
                    Bookings
                  </span>
                  <svg
                    className={`w-3 h-3 ml-auto ${
                      expandedMenu === "bookings"
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
                {expandedMenu === "bookings" && (
                  <ul className=" py-2 space-y-2">
                    <li>
                      <a
                        href="/admin/booking"
                        className="flex items-center w-full p-2 text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Active
                      </a>
                    </li>

                    <li>
                      <a
                        href="/admin/booking/history"
                        className="flex items-center w-full p-2 text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Booking History
                      </a>
                    </li>
                  </ul>
                )}
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
                        href="/admin/orders"
                        className="flex items-center w-full p-2 text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Active
                      </a>
                    </li>

                    <li>
                      <a
                        href="/admin/orders/history"
                        className="flex items-center w-full p-2 text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Order History
                      </a>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <a
                  href="/admin/reports"
                  className="flex items-center p-2 text-gray-700 hover:text-blue-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <FaRegChartBar size={20} />
                  <span className="flex-1 ms-3 hidden sm:block whitespace-nowrap">Reports</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>
    </>
  );
};

export default AdminSidebar;
