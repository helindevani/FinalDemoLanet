import React from "react";
import Image from "next/image";
import LogoVPN from "../../public/logo.png";
import Facebook from "../../public/facebook.png";
import Twitter from "../../public/twitter.png";
import Instagram from "../../public/google.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-4 pb-24 z-[1000] dark:bg-gray-900 border">
      <div className="max-w-screen-xl w-full mx-auto px-6 sm:px-8 lg:px-16 grid grid-rows-6 sm:grid-rows-1 grid-flow-row sm:grid-flow-col grid-cols-3 sm:grid-cols-12 gap-4">
        <div className="row-span-2 sm:col-span-4 col-start-1 col-end-4 sm:col-end-5 flex flex-col items-start">
          <Image src={LogoVPN} alt="LogoVpn" width={100} height={100} />
          <p className="mb-4">
            <strong className="font-medium">LaslesVPN</strong> is a private
            virtual network that has unique features and has high security.
          </p>
          <div className="flex w-full mt-2 mb-8 -mx-2">
            <div className="mx-2 bg-white rounded-full items-center justify-center flex p-2 shadow-md">
              <Image src={Facebook} alt="facebook" className="h-8 w-auto" />
            </div>
            <div className="mx-2 bg-white rounded-full items-center justify-center flex p-2 shadow-md">
              <Image src={Twitter} alt="twitter" className="h-8 w-auto" />
            </div>
            <div className="mx-2 bg-white rounded-full items-center justify-center flex p-2 shadow-md">
              <Image src={Instagram} alt="Instagram" className="h-8 w-auto" />
            </div>
          </div>
          <p className="text-gray-400">©{new Date().getFullYear()} - LaslesVPN</p>
        </div>
        <div className="row-span-2 sm:col-span-2 sm:col-start-7 sm:col-end-9 flex flex-col">
          <p className="text-black mb-4 font-medium text-lg">Product</p>
          <ul className="text-black">
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Download
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Pricing
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Locations
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Server
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Countries
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Blog
            </li>
          </ul>
        </div>
        <div className="row-span-2 sm:col-span-2 sm:col-start-9 sm:col-end-11 flex flex-col">
          <p className="text-black mb-4 font-medium text-lg">Engage</p>
          <ul className="text-black">
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              LaslesVPN ?
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              FAQ
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Tutorials
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              About Us
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Privacy Policy
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Terms of Service
            </li>
          </ul>
        </div>
        <div className="row-span-2 sm:col-span-2 sm:col-start-11 sm:col-end-13 flex flex-col">
          <p className="text-black mb-4 font-medium text-lg">Earn Money</p>
          <ul className="text-black">
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Affiliate
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Become Partner
            </li>
          </ul>
        </div>
      </div>
    </footer>  
  );
};

export default Footer;
