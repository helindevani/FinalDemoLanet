import React from 'react';
import Image from 'next/image';
import G1 from '../../public/G1.webp';
import G2 from '../../public/G2.webp';
import G3 from '../../public/G3.jpg';

const Gallery = () => {
  return (
    <div className="py-10 text-center">
      <h2 className="text-4xl font-bold mb-10 text-orange-500">Gallery</h2>
      <div className="flex justify-center gap-2">
  <div className="w-full sm:w-1/3 flex items-center justify-center">
    <Image 
      src={G1}
      alt="Green Cylinders" 
      className="rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
      width={350}
      height={220}
    />
  </div>
  <div className="w-full sm:w-1/3 flex items-center justify-center">
    <Image 
      src={G2}
      alt="Red Cylinders" 
      className="rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
      width={350}
      height={220}
    />
  </div>
  <div className="w-full sm:w-1/3 flex items-center justify-center">
    <Image 
      src={G3}
      alt="Transport Cylinders" 
      className="rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
      width={350}
      height={190}
    />
  </div>
</div>

    </div>
  );
};

export default Gallery;
