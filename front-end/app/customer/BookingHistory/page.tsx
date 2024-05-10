'use client';
import Sidebar from "@/components/Sidebar";
import React, { useState, useEffect } from "react";

interface GasBooking {
  id: string;
  date: string;
  status: string;
}

const GasBookingHistory: React.FC = () => {
  const [bookings, setBookings] = useState<GasBooking[]>([]);

  useEffect(() => {
    // Fetch gas booking history from API
    // Replace this with actual API call
    const fetchGasBookingHistory = async () => {
      try {
        // Simulated data for demonstration
        const data: GasBooking[] = [
          { id: "1", date: "2024-04-15", status: "Delivered" },
          { id: "2", date: "2024-04-10", status: "Pending" },
          { id: "3", date: "2024-04-05", status: "Delivered" },
        ];
        setBookings(data);
      } catch (error : any) {
        console.error("Error fetching gas booking history:", error.message);
        // Handle error (e.g., show error message)
      }
    };

    fetchGasBookingHistory();
  }, []);

  return (
    <Sidebar>
    <div className="bg-white px-6 py-8 sm:px-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Gas Booking History</h2>
      {bookings.length === 0 ? (
        <p>No booking history available.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Booking ID</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="border border-gray-300 px-4 py-2">{booking.id}</td>
                <td className="border border-gray-300 px-4 py-2">{booking.date}</td>
                <td className="border border-gray-300 px-4 py-2">{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </Sidebar>
  );
};

export default GasBookingHistory;
