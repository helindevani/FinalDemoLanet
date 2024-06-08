'use client';

import Sidebar from "@/components/Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <>
    <>
    <div className="page-wrapper">
        <div className="flex justify-between top-0 bg-white p-3 h-10 mb-10 sm:h-auto w-auto text-sm">
          <h3 className="text-xl text-blue-800 font-semibold text-primary">
            DashBoard
          </h3>
          <nav className="flex items-center space-x-2">
            <a href="#" className="text-gray-400 hover:text-blue-800">
              Home
            </a>
            <span className="text-gray-400">{`>`}</span>
            <span className="text-gray-600">Dashboard</span>
          </nav>
        </div>

        <div className="container m-auto h-screen">
          <div className="w-auto">
            <div className="bg-white shadow-md rounded px-8 pt-14 pb-15 m-10 w-auto h-auto">
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
        </div>
        </div>
        </div>
        </div>
        </>
    </>
  );
}

export default Dashboard;


