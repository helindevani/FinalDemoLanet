import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import LogoVPN from "../../public/logo.png";
import ButtonOutline from "../ButtonOutline";

const Header: React.FC = () => {
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [scrollActive, setScrollActive] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollActive(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={
          "fixed top-0 w-full z-50 bg-white transition-all" +
          (scrollActive ? " shadow-md pt-0" : " pt-3")
        }
      >
        <nav className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto grid grid-flow-col py-3 sm:py-4">
          <div className="col-start-1 col-end-2 flex items-center">
            <Image src={LogoVPN} alt="LogoImage" height={100} width={100} />
          </div>
            <ul className="hidden text-black-500  lg:flex col-start-4 col-end-8 text-black-500  items-center">
              <Link
                href="/"
                className={`px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative sm:mx-4 capitalize tracking-wide ${
                  activeLink === "about"
                    ? " text-orange-500 animation-active "
                    : " text-black-500 hover:text-orange-500 a"
                }`}
              >
                Home
              </Link>

              {/* <Link
                href="/auth/login"
                className={`px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative ${
                  activeLink === "about"
                    ? " text-orange-500 animation-active "
                    : " text-black-500 hover:text-orange-500 a"
                }`}
              >
                Admin
              </Link>

              <Link
                href="/auth/login"
                className={`px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative ${
                  activeLink === "about"
                    ? " text-orange-500 animation-active "
                    : " text-black-500 hover:text-orange-500 a"
                }`}
              >
                Customer
              </Link> */}

              <Link
                href="/about"
                className={`px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative sm:mx-4 capitalize tracking-wide ${
                  activeLink === "about"
                    ? " text-orange-500 animation-active "
                    : " text-black-500 hover:text-orange-500 a"
                }`}
              >
                About
              </Link>
            </ul>
            <div className="col-start-10 col-end-12 font-medium flex justify-end items-center">
              <Link href="/auth/login" className="text-black-600 mx-2 sm:mx-4 capitalize tracking-wide hover:text-orange-500 transition-all">
                  Sign In
              </Link>

            <ButtonOutline><Link href="/auth/register">Register</Link></ButtonOutline>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
