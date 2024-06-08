import React from 'react';
import S1 from '../../public/S1.webp';
import S2 from '../../public/S2.webp';
import S3 from '../../public/S3.webp';
import S4 from '../../public/S4.webp';
import Image from 'next/image';

const Services = () => {
  return (
    <div className="text-center py-10">
      <h2 className="text-4xl font-bold mb-10 text-orange-500">Services</h2>
      <div className="flex flex-wrap justify-center gap-8">
        <div className="max-w-xs p-6 border bg-white border-gray-300 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
          <Image 
            src={S1}
            alt="LPG Cylinder for Home"
            width={150}
            height={150}
            className="mx-auto mb-4"
          />
          <h3 className="text-lg font-semibold text-orange-600 mb-2">LPG Cylinder for Home</h3>
          <p className="text-gray-600 mb-4">Book top class regular size cylinders of accurate weight & superior quality for your household needs.</p>
        </div>
        <div className="max-w-xs p-6 border bg-white border-gray-300 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
          <Image 
            src={S2}
            alt="Chota Supergas"
            width={150}
            height={150}
            className="mx-auto mb-4"
          />
          <h3 className="text-lg font-semibold text-orange-600 mb-2">Chota Supergas</h3>
          <p className="text-gray-600 mb-4">We provide smaller cylinders that are safe, accurately weight and have easy portability for use.</p>
        </div>
        <div className="max-w-xs p-6 border bg-white border-gray-300 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
          <Image 
            src={S3}
            alt="Gas Connection for Office"
            width={150}
            height={150}
            className="mx-auto mb-4"
          />
          <h3 className="text-lg font-semibold text-orange-600 mb-2">Gas Connection for Office</h3>
          <p className="text-gray-600 mb-4">You can also register with us and start with new gas connection for your corporate offices.</p>
        </div>
        <div className="max-w-xs bg-white p-6 border border-gray-300 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
          <Image 
            src={S4}
            alt="Home Delivery"
            width={150}
            height={150}
            className="mx-auto mb-4"
          />
          <h3 className="text-lg font-semibold text-orange-600 mb-2">Home Delivery</h3>
          <p className="text-gray-600 mb-4">Book a new gas connection or refill it, we will deliver your cylinder at your place in no time.</p>
        </div>
      </div>
    </div>
  );
};

export default Services;
