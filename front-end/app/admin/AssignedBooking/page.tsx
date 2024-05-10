'use client';
import AdminSidebar from "@/components/AdminSidebar";
import React, { useState } from "react";

interface AssignedBooking {
  id: number;
  customerId: number;
  customerName: string;
  status: string;
  assignedTo: string;
  remarks: string;
}

const AssignedBooking: React.FC = () => {
  const [assignedBookings, setAssignedBookings] = useState<AssignedBooking[]>([
    { id: 1, customerId: 1, customerName: "John Doe", status: "Assigned", assignedTo: "Delivery Staff 1", remarks: "" },
    { id: 2, customerId: 2, customerName: "Jane Doe", status: "Assigned", assignedTo: "Delivery Staff 2", remarks: "" },
  ]);

  const handleChangeStatus = (id: number, newStatus: string) => {
    const updatedBookings = assignedBookings.map(booking =>
      booking.id === id ? { ...booking, status: newStatus } : booking
    );
    setAssignedBookings(updatedBookings);
  };

  const handleAddRemarks = (id: number, newRemarks: string) => {
    const updatedBookings = assignedBookings.map(booking =>
      booking.id === id ? { ...booking, remarks: newRemarks } : booking
    );
    setAssignedBookings(updatedBookings);
  };

  return (
    <AdminSidebar>
        <div className="bg-white px-6 py-8 sm:px-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Assigned Bookings</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Customer ID</th>
            <th className="border border-gray-300 px-4 py-2">Customer Name</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Assigned To</th>
            <th className="border border-gray-300 px-4 py-2">Remarks</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignedBookings.map(booking => (
            <tr key={booking.id}>
              <td className="border border-gray-300 px-4 py-2">{booking.id}</td>
              <td className="border border-gray-300 px-4 py-2">{booking.customerId}</td>
              <td className="border border-gray-300 px-4 py-2">{booking.customerName}</td>
              <td className="border border-gray-300 px-4 py-2">{booking.status}</td>
              <td className="border border-gray-300 px-4 py-2">{booking.assignedTo}</td>
              <td className="border border-gray-300 px-4 py-2">{booking.remarks}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button onClick={() => handleChangeStatus(booking.id, "Confirmed")} className="bg-green-500 text-white py-1 px-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300">
                  Confirm
                </button>
                <button onClick={() => handleChangeStatus(booking.id, "Cancelled")} className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300 ml-2">
                  Cancel
                </button>
                <input
                  type="text"
                  placeholder="Add remarks"
                  className="ml-2 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring focus:ring-blue-300"
                  value={booking.remarks}
                  onChange={e => handleAddRemarks(booking.id, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </AdminSidebar>
    
  );
};

export default AssignedBooking;
