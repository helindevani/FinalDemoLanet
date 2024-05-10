'use client';
import Sidebar from "@/components/Sidebar";
import React, { useState } from "react";

const CylinderBookingForm: React.FC = () => {
  const [connectionNumber, setConnectionNumber] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Perform booking logic here (e.g., make API call)
      // Assuming successful booking
      setBookingSuccess(true);
    } catch (error: any) {
      console.error("Error booking cylinder:", error.message);
      // Handle booking error (e.g., display error message)
    }
  };

  return (
    <>
      <Sidebar>
        <div className="bg-white px-6 py-8 sm:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Book Cylinder</h2>
          {bookingSuccess ? (
            <div className="bg-green-100 text-green-900 px-4 py-3 rounded-md mb-6">
              Booking successful! Your cylinder will be delivered soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="connectionNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                  Connection Number
                </label>
                <input
                  type="text"
                  id="connectionNumber"
                  name="connectionNumber"
                  value={connectionNumber}
                  onChange={(e) => setConnectionNumber(e.target.value)}
                  placeholder="Enter your connection number"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
              >
                Book Cylinder
              </button>
            </form>
          )}
          {/* Table displaying form data */}
          <table className="w-full mt-8">
            <thead>
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Connection Number</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Mobile Number</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Example row */}
              <tr>
                <td className="border px-4 py-2">1</td>
                <td className="border px-4 py-2">123456789</td>
                <td className="border px-4 py-2">John Doe</td>
                <td className="border px-4 py-2">123-456-7890</td>
                <td className="border px-4 py-2">john@example.com</td>
                <td className="border px-4 py-2">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Book</button>
                </td>
              </tr>
              {/* You can map through an array of data to dynamically render rows */}
            </tbody>
          </table>
        </div>
      </Sidebar>
    </>
  );
};

export default CylinderBookingForm;
