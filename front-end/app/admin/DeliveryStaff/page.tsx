'use client';
import AdminSidebar from "@/components/AdminSidebar";
import React, { useState } from "react";

interface Staff {
  id: number;
  name: string;
  role: string;
}

const DeliveryStaffManagement: React.FC = () => {
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [newStaff, setNewStaff] = useState<Staff>({ id: 0, name: "", role: "" });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewStaff({ ...newStaff, [name]: value });
  };

  const addStaff = () => {
    // Generate a unique ID for the new staff member
    const id = staffList.length > 0 ? staffList[staffList.length - 1].id + 1 : 1;
    setNewStaff({ ...newStaff, id });
    setStaffList([...staffList, newStaff]);
    setNewStaff({ id: 0, name: "", role: "" }); // Reset the input fields after adding staff
  };

  const updateStaff = (id: number, updatedStaff: Staff) => {
    const updatedList = staffList.map(staff => (staff.id === id ? updatedStaff : staff));
    setStaffList(updatedList);
  };

  return (
    <AdminSidebar>
        <div className="bg-white px-6 py-8 sm:px-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Delivery Staff Management</h2>
      <div className="mb-4">
        <input
          type="text"
          name="name"
          value={newStaff.name}
          onChange={handleInputChange}
          placeholder="Enter staff name"
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="text"
          name="role"
          value={newStaff.role}
          onChange={handleInputChange}
          placeholder="Enter staff role"
          className="ml-2 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button onClick={addStaff} className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
          Add Staff
        </button>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Role</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map(staff => (
            <tr key={staff.id}>
              <td className="border border-gray-300 px-4 py-2">{staff.id}</td>
              <td className="border border-gray-300 px-4 py-2">{staff.name}</td>
              <td className="border border-gray-300 px-4 py-2">{staff.role}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button onClick={() => updateStaff(staff.id, { ...staff, name: "Updated Name" })} className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
                  Update
                </button>
                {/* Add delete functionality here */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </AdminSidebar>
    
  );
};

export default DeliveryStaffManagement;
