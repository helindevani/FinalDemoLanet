'use client';
import React, { useState, useEffect } from "react";
import { FaExpandArrowsAlt, FaTachometerAlt, FaUserFriends, FaMoneyBillAlt, FaChartBar, FaCog } from "react-icons/fa";
import { FaRegChartBar, FaUser } from "react-icons/fa6";
import { BiCylinder, BiListCheck } from 'react-icons/bi';

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
      <div className="flex">
        <button
          data-drawer-target="sidebar-multi-level-sidebar"
          data-drawer-toggle="sidebar-multi-level-sidebar"
          aria-controls="sidebar-multi-level-sidebar"
          type="button"
          className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              fill-rule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>

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
                  <FaTachometerAlt />
                  <span className="ms-3">Dashboard</span>
                </a>
              </li>
              <li>
                <button
                  type="button"
                  className="flex items-center w-full p-2 text-base text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  onClick={() => toggleSubMenu("consumer")}
                >
                  <FaUser />
                  <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                    Consumer
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
                        href="/admin/Consumer"
                        className="flex items-center w-full p-2 text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Add Consumer
                      </a>
                    </li>
                    <li>
                      <a
                        href="/admin/Consumer/ManageConsumer"
                        className="flex items-center w-full p-2 text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Manage Consumer
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
                  <FaUserFriends />
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
                  <BiListCheck />
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
                  <BiCylinder />
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
                  <FaExpandArrowsAlt/>
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
                        New Connections
                      </a>
                    </li>
                    <li>
                      <a
                        href="/admin/Connection/OnHoldConnections"
                        className="flex items-center w-full p-2 text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        On Hold Connections
                      </a>
                    </li>
                    <li>
                      <a
                        href="/admin/Connection/ApprovedConnections"
                        className="flex items-center w-full p-2 text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Approved Connections
                      </a>
                    </li>
                    <li>
                      <a
                        href="/admin/Connection/RejectedConnections"
                        className="flex items-center w-full p-2 v transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Rejected Connections
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
                 <FaMoneyBillAlt/>
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
                        href="#"
                        className="flex items-center w-full p-2 text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Add Bookings
                      </a>
                    </li>
                    <li>
                      <a
                        href="/admin/Booking/ManageBooking"
                        className="flex items-center w-full p-2 text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Manage Bookings
                      </a>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <a
                  href="/admin/Reports"
                  className="flex items-center p-2 text-gray-700 hover:text-blue-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <FaRegChartBar/>
                  <span className="flex-1 ms-3 whitespace-nowrap">Reports</span>
                </a>
              </li>
              <li>
                <button
                  type="button"
                  className="flex items-center w-full p-2 text-base text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  onClick={() => toggleSubMenu("settings")}
                >
                  <FaCog/>
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
