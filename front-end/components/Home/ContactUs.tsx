import React from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaClock } from 'react-icons/fa';

const ContactUs = () => {
  return (
    <div className="relative p-8 bg-gray-50">
      <h2 className="text-4xl font-bold text-center text-orange-500 mb-8">Contact Us</h2>
      <div className="grid grid-cols-2 gap-8">
      <div className='flex flex-col items-center justify-center'>
        <div>
        <div className="mb-4 flex items-center">
    <FaMapMarkerAlt className="text-orange-500 mr-4" size={30} />
    <div>
      <h3 className="font-semibold">Our Office Address</h3>
      <p>area, city, landmark, pincode</p>
    </div>
  </div>
  <div className="mb-4 flex items-center">
    <FaEnvelope className="text-orange-500 mr-4" size={30} />
    <div>
      <h3 className="font-semibold">General Enquiries</h3>
      <p>sample@example.com</p>
    </div>
  </div>
  <div className="mb-4 flex items-center">
    <FaPhoneAlt className="text-orange-500 mr-4" size={30} />
    <div>
      <h3 className="font-semibold">Call Us</h3>
      <p>+91-1111111111</p>
    </div>
  </div>
  <div className="mb-4 flex items-center">
    <FaClock className="text-orange-500 mr-4" size={30} />
    <div>
      <h3 className="font-semibold">Our Timing</h3>
      <p>Mon - Sun : 10:00 AM - 07:00 PM</p>
    </div>
  </div>
        </div>
  
</div>

        <div>
          <form className="space-y-4">
            <input type="text" placeholder="YOUR NAME" className="w-full p-2 border border-gray-300 rounded" />
            <input type="email" placeholder="YOUR EMAIL" className="w-full p-2 border border-gray-300 rounded" />
            <input type="text" placeholder="YOUR CONTACT NO." className="w-full p-2 border border-gray-300 rounded" />
            <textarea placeholder="YOUR MESSAGE" className="w-full p-2 border border-gray-300 rounded"></textarea>
            <button type="submit" className="bg-orange-500 text-white py-2 px-4 rounded">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
