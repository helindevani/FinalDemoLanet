'use client';
import AdminSidebar from "@/components/AdminSidebar";
import React, { useState } from "react";

interface BookingRequest {
  id: number;
  customerId: number;
  customerName: string;
  status: string;
  assignedTo: string | null;
}

const Booking: React.FC = () => {
  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>([
    { id: 1, customerId: 1, customerName: "John Doe", status: "Pending", assignedTo: null },
    { id: 2, customerId: 2, customerName: "Jane Doe", status: "Confirmed", assignedTo: "Delivery Staff 1" },
    { id: 3, customerId: 3, customerName: "Alice Smith", status: "Pending", assignedTo: null },
  ]);

  const handleAssignStaff = (id: number, staffName: string) => {
    const updatedRequests = bookingRequests.map(request =>
      request.id === id ? { ...request, status: "Assigned", assignedTo: staffName } : request
    );
    setBookingRequests(updatedRequests);
  };

  const handleCancelBooking = (id: number) => {
    const updatedRequests = bookingRequests.map(request =>
      request.id === id ? { ...request, status: "Cancelled", assignedTo: null } : request
    );
    setBookingRequests(updatedRequests);
  };

  return (
    <AdminSidebar>
        <div className="bg-white px-6 py-8 sm:px-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Booking Requests</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Customer ID</th>
            <th className="border border-gray-300 px-4 py-2">Customer Name</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Assigned To</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookingRequests.map(request => (
            <tr key={request.id}>
              <td className="border border-gray-300 px-4 py-2">{request.id}</td>
              <td className="border border-gray-300 px-4 py-2">{request.customerId}</td>
              <td className="border border-gray-300 px-4 py-2">{request.customerName}</td>
              <td className="border border-gray-300 px-4 py-2">{request.status}</td>
              <td className="border border-gray-300 px-4 py-2">{request.assignedTo || "-"}</td>
              <td className="border border-gray-300 px-4 py-2">
                {request.status === "Pending" && (
                  <>
                    <button onClick={() => handleAssignStaff(request.id, "Delivery Staff 1")} className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
                      Assign Staff
                    </button>
                    <button onClick={() => handleCancelBooking(request.id)} className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300 ml-2">
                      Cancel Booking
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </AdminSidebar>
    
  );
};

export default Booking;
