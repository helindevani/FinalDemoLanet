'use client';
import React, { useState, useEffect } from "react";
import AdminSidebar from "@/components/Sidebar/AdminSidebar";

interface User {
  userId: number;
  userName: string;
  roles: string[];
}

const RegisteredUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('http://localhost:5057/api/Admin/Users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setUsers(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
      <div className="bg-white px-6 py-8 sm:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Registered Users</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">User ID</th>
              <th className="border border-gray-300 px-4 py-2">Username</th>
              <th className="border border-gray-300 px-4 py-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.userId}>
                <td className="border border-gray-300 px-4 py-2">{user.userId}</td>
                <td className="border border-gray-300 px-4 py-2">{user.userName}</td>
                <td className="border border-gray-300 px-4 py-2">{user.roles.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RegisteredUsers;
