import React, { useState, useEffect, useRef, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import LogoVPN from "../../public/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/authSlice";
import { TfiAlignJustify } from "react-icons/tfi";
import AdminSidebar from "../Sidebar/AdminSidebar";
import Cookies from "js-cookie";
import StaffSidebar from "../Sidebar/StaffSidebar";
import Sidebar from "../Sidebar/Sidebar";
import { decode } from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { HeaderProps, RootState } from "../TypeInterface/AllType";
import { usePathname, useRouter } from "next/navigation";
import Modal from "../Items/Model";
import ProfileComponent from "../Profile/Profile";
import { Link as ScrollLink } from "react-scroll";
import ButtonOutline from "../Items/ButtonOutline";
import { ToastSuccess } from "../ToastError";

const Header: React.FC<HeaderProps> = ({ isLogin, children }) => {
  const dispatch = useDispatch();
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  const [image, setImage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<"User" | "Admin" | "Staff" | null>(null);
  const router = useRouter();
  const path = usePathname();
  const dropdownRef = useRef<HTMLUListElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const token = Cookies.get("token");
  const userData: any = useSelector((state: RootState) => state.auth);
  const [scrollTarget, setScrollTarget] = useState<string | null>(null);

  useEffect(() => {
    if (scrollTarget && path === "/") {
      const element = document.getElementById(scrollTarget);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        setScrollTarget(null); // Reset the scroll target
      }
    }
  }, [scrollTarget, path]);

  const handleScrollLinkClick = (target: string) => {
    setActiveLink(target);
    if (path !== "/") {
      setScrollTarget(target);
      router.push("/");
      window.scrollBy(0, -80);
    } else {
      const element = document.getElementById(target);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        window.scrollBy(0, -80);
      }
    }
  };

  useEffect(() => {
    if (token) {
      const decodedToken = decode(token) as JwtPayload;
      let roles = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      if (typeof roles === 'object') {
        roles = roles[0];
        setUserRole(roles);
      } else {
        setUserRole(roles as "User" | "Admin" | "Staff" | null);
      }
      if (userRole != null) {
        localStorage.setItem("role", userRole);
      }
      setImage(userData.token.profileImage);
    }
  }, [token, userRole]);

  useEffect(() => {
    if (path === "/" || path === "/auth/login") {
      setShowSidebar(false);
    } else {
      setShowSidebar(true);
    }
  }, [path]);

  const renderSidebar = () => {
    switch (userRole) {
      case "Admin":
        return <AdminSidebar />;
      case "Staff":
        return <StaffSidebar />;
      case "User":
        return <Sidebar />;
      default:
        return null;
    }
  };

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

  const handleSidebarToggle = () => {
    setShowSidebar(!showSidebar);
  };

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleProfileClick = () => {
    setShowModal(true);
    setShowDropdown(false);
  };

  const handleClick = () => {
    dispatch(logout());
    localStorage.removeItem("role");
    ToastSuccess("Successfully LogOut Your Account!!");
    router.push('/');
  };

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-slate-100 transition-all border">
        <nav className="flex justify-between items-center p-4">
          <div className="flex items-center ">
            {isLogin && <button className="p-2 m-1" onClick={handleSidebarToggle}>
              <TfiAlignJustify />
            </button>}

            <Image src={LogoVPN} alt="LogoImage" height={50} width={50} />

            <span className="text-4xl p-1 m-1 text-gray-800">Refill Smart</span>
          </div>

          <div className="flex space-x-4">
            <ScrollLink
              to="home"
              smooth={true}
              duration={500}
              offset={-80}
              onClick={() => {
                setActiveLink("home");
                router.push("/");
              }}
              className={`px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative ${
                activeLink === "home"
                  ? " text-orange-500 animation-active "
                  : " text-black-500 hover:text-orange-500 a"
              }`} >
              Home
            </ScrollLink>
            <ScrollLink
              to="services"
              smooth={true}
              duration={500}
              offset={-80}
              onClick={() => handleScrollLinkClick("services")}
              className={`px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative ${
                activeLink === "services"
                  ? " text-orange-500 animation-active "
                  : " text-black-500 hover:text-orange-500 a"
              }`} >
              Services
            </ScrollLink>
            <ScrollLink
              to="about"
              smooth={true}
              duration={500}
              offset={-80}
              onClick={() => handleScrollLinkClick("about")}
              className={`px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative ${
                activeLink === "about"
                  ? " text-orange-500 animation-active "
                  : " text-black-500 hover:text-orange-500 a"
              }`}>
              About
            </ScrollLink>
            <ScrollLink
              to="gallery"
              smooth={true}
              duration={500}
              offset={-80}
              onClick={() => handleScrollLinkClick("gallery")}
              className={`px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative ${
                activeLink === "gallery"
                  ? " text-orange-500 animation-active "
                  : " text-black-500 hover:text-orange-500 a"
              }`}>
              Gallery
            </ScrollLink>
            <ScrollLink
              to="whyus"
              smooth={true}
              duration={500}
              offset={-80}
              onClick={() => handleScrollLinkClick("whyus")}
              className={`px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative ${
                activeLink === "whyus"
                  ? " text-orange-500 animation-active "
                  : " text-black-500 hover:text-orange-500 a"
              }`} >
              Why Us
            </ScrollLink>
            <ScrollLink
              to="testimonials"
              smooth={true}
              duration={500}
              offset={-80}
              onClick={() => handleScrollLinkClick("testimonials")}
              className={`px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative ${
                activeLink === "testimonials"
                  ? " text-orange-500 animation-active "
                  : " text-black-500 hover:text-orange-500 a"
              }`} >
              Testimonials
            </ScrollLink>
            <ScrollLink
              to="contact"
              smooth={true}
              duration={500}
              offset={-80}
              onClick={() => handleScrollLinkClick("contact")}
              className={`px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative ${
                activeLink === "contact"
                  ? " text-orange-500 animation-active "
                  : " text-black-500 hover:text-orange-500 a"
              }`}>
              Contact
            </ScrollLink>

            {isLogin && <div className="relative sm:h-auto sm:w-auto" ref={avatarRef}>
              <div
                className="flex items-center cursor-pointer h-auto w-auto"
                onClick={handleDropdownToggle}
              >
                <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  {image ? (
                    <Image
                      src={image}
                      alt="Profile"
                      width={144}
                      height={144}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
              {showDropdown && (
                <ul
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg"
                >
                  <li
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={handleProfileClick}
                  >
                    <p>My Profile</p>
                  </li>
                  <li
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={handleDropdownToggle}
                  >
                    <p onClick={handleClick}>Logout</p>
                  </li>
                </ul>
              )}

            </div>}
            {!isLogin && <div className="font-medium flex justify-end items-center">
              <Link
                href="/auth/login"
                className="text-black-600 mx-2 sm:mx-4 capitalize tracking-wide hover:text-orange-500 transition-all"
              >
                Sign In
              </Link>
              <ButtonOutline>
                <Link href="/auth/register">Register</Link>
              </ButtonOutline>
            </div>}

          </div>

        </nav>
      </header>
      <div className="flex">
        {showSidebar && renderSidebar()}
        <div className="flex-col w-full h-auto mt-[80px]">{children}</div>
      </div>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ProfileComponent />
      </Modal>
    </>
  );
};

export default Header;
