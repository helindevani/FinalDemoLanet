'use client';
import React, { useState, useEffect } from 'react';
import Tbg from '../../public/Tbg.jpg';
import Image from 'next/image';

const testimonials = [
  {
    text: "Their LPG cylinder services are excellent. They not just provide quick gas connection but also are cost effective.",
    author: "Mohit Das"
  },
  {
    text: "Great service and support. Highly recommend their services.",
    author: "Priya Singh"
  },
  {
    text: "Affordable and reliable LPG gas connection. Quick and efficient service.",
    author: "Rahul Sharma"
  }
];

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="relative w-full h-96 flex items-center justify-center">

        <div className="absolute inset-0 opacity-10 bg-cover bg-center z-0">
            <Image src={Tbg} alt="background image" className="w-full h-full"></Image></div>
        <div className="relative z-10">
          <h2 className="text-5xl font-bold text-center text-orange-500 pb-4 mb-4">Testimonials</h2>
          <div className="text-center">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`slide ${index === currentSlide ? 'block' : 'hidden'}`}
              >
                <p className="text-2xl">{testimonial.text}</p>
                <p className="mt-4 text-orange-500 text-xl">- {testimonial.author}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className={`h-3 w-3 rounded-full mx-2 ${index === currentSlide ? 'bg-gray-800' : 'bg-gray-400'}`}
              />
            ))}
          </div>
        </div>

    </div>
  );
};

export default Testimonials;
