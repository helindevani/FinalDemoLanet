'use client';
import Sidebar from "@/components/Sidebar";
import React, { useState } from "react";

interface GasBooking {
  id: string;
  date: string;
  status: string;
}

const GasBookingSearch: React.FC = () => {
  const [bookingNumber, setBookingNumber] = useState("");
  const [booking, setBooking] = useState<GasBooking | null>(null);

  const handleSearch = () => {
    // Replace this with actual API call to search for the booking number
    // Simulated data for demonstration
    const foundBooking: GasBooking | undefined = gasBookings.find(
      (booking) => booking.id === bookingNumber
    );
    setBooking(foundBooking || null);
  };

  const gasBookings: GasBooking[] = [
    { id: "1", date: "2024-04-15", status: "Delivered" },
    { id: "2", date: "2024-04-10", status: "Pending" },
    { id: "3", date: "2024-04-05", status: "Delivered" },
  ];

  return (
    <Sidebar>
       <div className="bg-white px-6 py-8 sm:px-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Search Gas Booking</h2>
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={bookingNumber}
          onChange={(e) => setBookingNumber(e.target.value)}
          placeholder="Enter booking number"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          onClick={handleSearch}
          className="ml-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Search
        </button>
      </div>
      {booking && (
        <div className="bg-gray-100 rounded-md p-4">
          <p><strong>Booking ID:</strong> {booking.id}</p>
          <p><strong>Date:</strong> {booking.date}</p>
          <p><strong>Status:</strong> {booking.status}</p>
        </div>
      )}
      {booking === null && bookingNumber && (
        <p className="text-red-500">No booking found for the entered booking number.</p>
      )}
    </div>
    </Sidebar>
   
  );
};

export default GasBookingSearch;
