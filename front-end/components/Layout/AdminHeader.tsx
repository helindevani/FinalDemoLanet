import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import LogoVPN from "../../public/logo.png";
import Notification from "../Notification";
import { useDispatch } from "react-redux";
import { logout } from "@/store/authSlice";
import { TfiAlignJustify } from "react-icons/tfi";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [scrollActive, setScrollActive] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLUListElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollActive(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        avatarRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !avatarRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClick = () => {
    dispatch(logout());
  };

  const toggleNotification = () => {
    setShowNotification(!showNotification);
  };

  return (
    <>
      <header
        className={
          "fixed top-0 w-full z-50 bg-white transition-all border" 
        }
      >
        
        <nav className="flex justify-between items-center p-4">
        <div className="flex items-center ">
        <button className="p-2">
        <TfiAlignJustify />
          </button>
         
            <Image src={LogoVPN} alt="LogoImage" height={100} width={100} />
          </div>

          <div className="flex space-x-4">
            {/* <div className="flex"> */}
            <Link
                href="/"
                className={`px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative ${
                  activeLink === "about"
                    ? " text-orange-500 animation-active "
                    : " text-black-500 hover:text-orange-500 a"
                }`}
              >
                Home
              </Link>
              <button
                id="dropdownNotificationButton"
                onClick={toggleNotification}
                className={`px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative items-center text-sm font-medium text-center text-gray-500 hover:text-orange-500 focus:outline-none dark:hover:text-white dark:text-gray-400`}
                type="button"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 14 20"
                >
                  <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
                </svg>
                <div className="absolute block w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-0.5 start-2.5 dark:border-gray-900"></div>
              </button>
              <div className="relative sm:h-auto sm:w-auto" ref={avatarRef}>
                <div
                  className="flex items-center cursor-pointer h-auto w-auto"
                  onClick={handleDropdownToggle}
                >
                  <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <svg
                      className="absolute w-12 h-12 text-gray-400 -left-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
                {showDropdown && (
                  <ul
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg"
                  >
                    <li
                      className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                      onClick={handleDropdownToggle}
                    >
                      <Link href="/admin/Profile">My Profile</Link>
                    </li>
                    <li
                      className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                      onClick={handleDropdownToggle}
                    >
                      <Link href="/settings">Settings</Link>
                    </li>
                    <li
                      className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                      onClick={handleDropdownToggle}
                    >
                      <button onClick={handleClick}>Logout</button>
                    </li>
                  </ul>
                )}

                {/* </div> */}
            </div>
          </div>
        </nav>
      </header>

      {showNotification && <Notification />}
    </>
  );
};

export default Header;
