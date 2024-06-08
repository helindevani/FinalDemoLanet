import React from 'react';
import Image from 'next/image';
import banner from '../../public/Gas Banner.jpeg';
const GasAgencyBanner = () => {
  return (
    <div className="relative w-full h-screen">
      <Image
      src={banner}
        alt="Gas Agency"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-opacity-50 flex flex-col justify-center items-start p-8">
        <div className="text-white space-y-4">
          <h1 className="text-2xl md:text-4xl font-semibold">Affordable And Precise</h1>
          <h2 className="text-4xl md:text-6xl font-bold"> Gas Booking System</h2>
        </div>
      </div>
    </div>
  );
};

export default GasAgencyBanner;