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

const AdminSidebar = ({ children }: any) => {
  const [expandedMenu, setExpandedMenu] = useState("");

  useEffect(() => {
    console.log("Expanded menu:", expandedMenu);
  }, [expandedMenu]);

  const toggleSubMenu = (menuId: string) => {
    setExpandedMenu(menuId === expandedMenu ? "" : menuId);
  };
  return (
    <>
      <div className="flex border z-40">
        <aside
          id="sidebar-multi-level-sidebar"
          className="sticky top-[85px] left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 flex-col-2"
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-100 dark:bg-gray-800 ">
            <ul className="space-y-2 font-medium">
              <li>
                <a
                  href="/admin/AdminDasboard"
                  className="flex items-center p-2 text-gray-700 hover:text-blue-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <FaTachometerAlt size={20} />
                  <span className="ms-3">Dashboard</span>
                </a>
              </li>
              <li>
                <button
                  type="button"
                  className="flex items-center w-full p-2 text-base text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  onClick={() => toggleSubMenu("consumer")}
                >
                  <FaUser size={20} />
                  <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
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
                        href="/admin/DeliveryStaff"
                        className="flex items-center w-full p-2 text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Add Staff
                      </a>
                    </li>
                    <li>
                      <a
                        href="/admin/DeliveryStaff/ManageStaff"
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
                  <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
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
                        href="/admin/Supplier"
                        className="flex items-center w-full p-2 text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Add Supplier
                      </a>
                    </li>
                    <li>
                      <a
                        href="/admin/Supplier/ManageSupplier"
                        className="flex items-center w-full p-2 text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Manage Supplier
                      </a>
                    </li>
                    <li>
                      <a
                        href="/admin/Supplier/ImportSupplier"
                        className="flex items-center w-full p-2 text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Import Supplier
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
                  <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
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
                        href="/admin/Categories"
                        className="flex items-center w-full p-2 text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Add Categories
                      </a>
                    </li>
                    <li>
                      <a
                        href="/admin/Categories/ManageCategories"
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
                  <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
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
                        href="/admin/Cylinder"
                        className="flex items-center w-full p-2 text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Add Cylinder
                      </a>
                    </li>
                    <li>
                      <a
                        href="/admin/Cylinder/ManageCylinders"
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
                  <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
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
                        href="/admin/Connection"
                        className="flex items-center w-full p-2 text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        New
                      </a>
                    </li>

                    <li>
                      <a
                        href="/admin/Connection/ApprovedConnections"
                        className="flex items-center w-full p-2 text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Approved
                      </a>
                    </li>
                    <li>
                      <a
                        href="/admin/Connection/RejectedConnections"
                        className="flex items-center w-full p-2 text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Rejected
                      </a>
                    </li>
                  </ul>
                )}
              </li>
              <li>
              <a
                  href="/admin/Booking"
                  className="flex items-center p-2 text-gray-700 hover:text-blue-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <FaMoneyBillAlt size={20} />
                  <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                    Bookings
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="/admin/Reports"
                  className="flex items-center p-2 text-gray-700 hover:text-blue-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <FaRegChartBar size={20} />
                  <span className="flex-1 ms-3 whitespace-nowrap">Reports</span>
                </a>
              </li>
              <li>
                <button
                  type="button"
                  className="flex items-center w-full p-2 text-base text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  onClick={() => toggleSubMenu("settings")}
                >
                  <FaCog size={20} />
                  <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                    Settings
                  </span>
                  <svg
                    className={`w-3 h-3 ml-auto ${
                      expandedMenu === "settings" ? "transform rotate-180" : ""
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
                {expandedMenu === "settings" && (
                  <ul className="py-2 space-y-2">
                    <li>
                      <a
                        href="#"
                        className="flex items-center w-full p-2 text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Products
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center w-full p-2 text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Billing
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center w-full p-2 text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Invoice
                      </a>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </aside>
        <div className="flex-col flex-col-11 w-full h-auto">{children}</div>
      </div>
    </>
  );
};

export default AdminSidebar;
