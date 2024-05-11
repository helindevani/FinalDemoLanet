'use client';

import Sidebar from "@/components/Sidebar";

const Dashboard = () => {
  return (
    <>
    <Sidebar>
        <div className="bg-white px-6 py-8 sm:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Welcome to Gas Booking</h1>
          <p className="text-lg text-gray-700 mb-6">Book your gas cylinders hassle-free with our user-friendly platform.</p>
          <p className="text-lg text-gray-700 mb-6">We offer:</p>
          <ul className="list-disc list-inside text-lg text-gray-700 mb-6">
            <li>Easy online booking process</li>
            <li>Fast delivery</li>
            <li>Secure payment options</li>
            <li>24/7 customer support</li>
          </ul>
          <p className="text-lg text-gray-700 mb-6">Start booking now and experience convenience at your fingertips!</p>
        </div>
        </Sidebar>
    </>
  );
}

export default Dashboard;


