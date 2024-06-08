import React from 'react';
import A from '../../public/A.webp';
import Image from 'next/image';
const AboutUs = () => {
  return (
    <div className="flex flex-wrap justify-center items-center p-10 bg-gray-50">
    
      <div className="w-full sm:w-1/2 p-4 flex items-center justify-center">
    <Image 
      src={A}
      alt="Red Cylinders" 
      className="rounded-lg shadow-lg  w-full h-auto transform transition duration-300 hover:scale-105"
      width={350}
      height={220}
    />
  </div>
      <div className="w-full md:w-1/2 p-4 text-center">
        <h2 className="text-4xl font-bold items-center justify-center text-orange-600 mb-4">About Us</h2>
        <p className="text-xl text-gray-700">
          We, dummy company, situated at area, city, state, are one of the most popular & reliable gas agencies in the vicinity that provide gas cylinders and other cooking gas connections to residents as and when required. We ensure that our clients do not complain about untimely meals & skipping lunches and thus are at their beck and call. Our staff is extremely determined in making it a smooth and easy going experience for you.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
