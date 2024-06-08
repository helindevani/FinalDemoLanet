"use client";
import React, { useState } from "react";
import {
  FaExpandArrowsAlt,
  FaTachometerAlt,
  FaUserFriends,
  FaMoneyBillAlt,
  FaRegChartBar,
  FaUser,
} from "react-icons/fa";
import { BiCylinder, BiListCheck } from "react-icons/bi";
import { IoReceiptSharp } from "react-icons/io5";
import { usePathname } from "next/navigation";

const AdminSidebar = () => {
  const [expandedMenu, setExpandedMenu] = useState("");
  const router = usePathname();

  const toggleSubMenu = (menuId : string) => {
    setExpandedMenu(menuId === expandedMenu ? "" : menuId);
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", href: "/admin", icon: <FaTachometerAlt size={20} /> },
    {
      id: "staff",
      label: "Delivery Staff",
      href: "/admin/staff",
      subMenu: [
        { label: "Add Staff", href: "/admin/staff" },
        { label: "Manage Staff", href: "/admin/staff/manage" },
      ],
      icon: <FaUser size={20} />,
    },
    {
      id: "supplier",
      label: "Supplier",
      href: "/admin/supplier",
      subMenu: [
        { label: "Add Supplier", href: "/admin/supplier" },
        { label: "Manage Supplier", href: "/admin/supplier/manage" },
      ],
      icon: <FaUserFriends size={20} />,
    },
    {
      id: "categories",
      label: "Categories",
      href: "/admin/categories",
      subMenu: [
        { label: "Add Categories", href: "/admin/categories" },
        { label: "Manage Categories", href: "/admin/categories/manage" },
      ],
      icon: <BiListCheck size={20} />,
    },
    {
      id: "cylinder",
      label: "Cylinder",
      href: "/admin/cylinder",
      subMenu: [
        { label: "Add Cylinder", href: "/admin/cylinder" },
        { label: "Manage Cylinders", href: "/admin/cylinder/manage" },
      ],
      icon: <BiCylinder size={20} />,
    },
    {
      id: "connections",
      label: "Connections",
      href: "/admin/connection",
      subMenu: [
        { label: "New", href: "/admin/connection" },
        { label: "Approved", href: "/admin/connection/approved" },
      ],
      icon: <FaExpandArrowsAlt size={20} />,
    },
    {
      id: "bookings",
      label: "Bookings",
      href: "/admin/booking",
      subMenu: [
        { label: "Active", href: "/admin/booking" },
        { label: "Booking History", href: "/admin/booking/history" },
      ],
      icon: <FaMoneyBillAlt size={20} />,
    },
    {
      id: "orders",
      label: "Orders",
      href: "/admin/orders",
      subMenu: [
        { label: "Active", href: "/admin/orders" },
        { label: "Order History", href: "/admin/orders/history" },
      ],
      icon: <IoReceiptSharp size={20} />,
    },
    { id: "reports", label: "Reports", href: "/admin/reports", icon: <FaRegChartBar size={20} /> },
  ];

  return (
    <aside className="sm:w-56 mt-[80px]">
      <div className="h-full px-3 w-14 sm:w-56 py-4 overflow-y-auto bg-gray-100 dark:bg-gray-800 ">
        <ul className="space-y-2 font-medium">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`rounded-lg ${
                router === item.href ||
                (item.subMenu && item.subMenu.some((subItem) => router === subItem.href))
                  ? "bg-white shadow-lg text-blue-900"
                  : "text-gray-700 hover:text-blue-900 dark:text-white hover:bg-white hover:shadow-lg dark:hover:bg-gray-700"
              }`}
            >
              {item.subMenu ? (
                <>
                  <button
                    type="button"
                    className="flex items-center w-full p-2 text-base text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    onClick={() => toggleSubMenu(item.id)}
                  >
                    {item.icon}
                    <span className="flex-1 ms-3 hidden sm:block text-left rtl:text-right whitespace-nowrap">
                      {item.label}
                    </span>
                    <svg
                      className={`w-3 h-3 ml-auto ${
                        expandedMenu === item.id ? "transform rotate-180" : ""
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
                  {expandedMenu === item.id && (
                    <ul className="py-2 space-y-2">
                      {item.subMenu.map((subItem) => (
                        <li key={subItem.label}>
                          <a
                            href={subItem.href}
                            className={`flex items-center w-full p-2 text-gray-700 hover:text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${
                              router === subItem.href ? "bg-white shadow-lg text-blue-900" : ""
                            }`}
                          >
                            {subItem.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <a
                  href={item.href}
                  className={`flex items-center p-2 text-gray-700 hover:text-blue-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                    router === item.href ? "bg-white shadow-lg text-blue-900" : ""
                  }`}
                >
                  {item.icon}
                  <span className="ms-3 hidden sm:block">{item.label}</span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default AdminSidebar;
