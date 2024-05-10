'use client';
import AdminSidebar from "@/components/AdminSidebar";
import React, { useState } from "react";

interface Booking {
  id: number;
  bookingNumber: string;
  customerName: string;
  status: string;
}

interface Connection {
  id: number;
  connectionNumber: string;
  customerName: string;
  status: string;
}

const Search: React.FC = () => {
  const [bookingNumber, setBookingNumber] = useState<string>("");
  const [connectionNumber, setConnectionNumber] = useState<string>("");

  const [bookingResult, setBookingResult] = useState<Booking | null>(null);
  const [connectionResult, setConnectionResult] = useState<Connection | null>(null);

  const handleSearchBooking = () => {
    // Simulated search logic - replace with actual API call
    const mockBookingData: Booking[] = [
      { id: 1, bookingNumber: "B12345", customerName: "John Doe", status: "Confirmed" },
      { id: 2, bookingNumber: "B67890", customerName: "Jane Smith", status: "Pending" },
    ];

    const result = mockBookingData.find(booking => booking.bookingNumber === bookingNumber);
    setBookingResult(result || null);
  };

  const handleSearchConnection = () => {
    // Simulated search logic - replace with actual API call
    const mockConnectionData: Connection[] = [
      { id: 1, connectionNumber: "C54321", customerName: "John Doe", status: "Approved" },
      { id: 2, connectionNumber: "C09876", customerName: "Jane Smith", status: "Pending" },
    ];

    const result = mockConnectionData.find(connection => connection.connectionNumber === connectionNumber);
    setConnectionResult(result || null);
  };

  return (
    <AdminSidebar>
    <div className="bg-white px-6 py-8 sm:px-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Search</h2>
      <div className="mb-4">
        <label htmlFor="bookingNumber" className="mr-4">Booking Number:</label>
        <input type="text" id="bookingNumber" value={bookingNumber} onChange={(e) => setBookingNumber(e.target.value)} className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300" />
        <button onClick={handleSearchBooking} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 ml-4">Search</button>
      </div>
      {bookingResult && (
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Booking Result:</h3>
          <p><strong>Booking Number:</strong> {bookingResult.bookingNumber}</p>
          <p><strong>Customer Name:</strong> {bookingResult.customerName}</p>
          <p><strong>Status:</strong> {bookingResult.status}</p>
        </div>
      )}
      <div>
        <label htmlFor="connectionNumber" className="mr-4">Connection Number:</label>
        <input type="text" id="connectionNumber" value={connectionNumber} onChange={(e) => setConnectionNumber(e.target.value)} className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300" />
        <button onClick={handleSearchConnection} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 ml-4">Search</button>
      </div>
      {connectionResult && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Connection Result:</h3>
          <p><strong>Connection Number:</strong> {connectionResult.connectionNumber}</p>
          <p><strong>Customer Name:</strong> {connectionResult.customerName}</p>
          <p><strong>Status:</strong> {connectionResult.status}</p>
        </div>
      )}
    </div>
    </AdminSidebar>
  );
};

export default Search;
