import React, { useState, useEffect, useRef, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import LogoVPN from "../../public/logo.png";
import ButtonOutline from "../ButtonOutline";
import { HeaderProps } from "../TypeInterface/AllType";

const Header: React.FC<HeaderProps>= ({children}) => {

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-white transition-all border">
        <nav className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto grid grid-flow-col py-3 sm:py-4">
          <div className="col-start-1 col-end-2 flex items-center">
            <Image src={LogoVPN} alt="LogoImage" height={50} width={50} />
            <span className="text-4xl p-1 m-1 text-gray-800">Refill Smart</span>
          </div>
          <ul className="hidden text-black-500  lg:flex col-start-4 col-end-8 text-black-500  items-center">
            <Link
              href="/"
              className="px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative sm:mx-4 capitalize tracking-wide ${
                text-black-500 hover:text-orange-500" 
            >
              Home
            </Link>
            <Link
              href="/about"
              className="px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative sm:mx-4 capitalize tracking-wide ${
             text-black-500 hover:text-orange-500" 
            >
              About
            </Link>
          </ul>
          <div className="col-start-10 col-end-12 font-medium flex justify-end items-center">
            <Link
              href="/auth/login"
              className="text-black-600 mx-2 sm:mx-4 capitalize tracking-wide hover:text-orange-500 transition-all"
            >
                Sign In
            </Link>

            <ButtonOutline>
              <Link href="/auth/register">Register</Link>
            </ButtonOutline>
          </div>
        </nav>
      </header>
      <div className="flex-col w-full h-auto mt-[80px]">{children}</div>
    </>
  );
};

export default Header;
