'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminSidebar from '@/components/AdminSidebar';

const ManageBooking = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(`/api/orders`);
      const data = await response.json();
      setOrders(data.orders);
    };

    fetchOrders();
  }, []);

  return (
    <AdminSidebar>
      <div className="flex flex-col items-start justify-start w-full">
        <div className="w-full bg-white shadow-md rounded my-6">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800">Manage Booking</h2>
            <div className="mt-4 flex items-center justify-between">
              <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                  <Link href="/" className="text-gray-500 hover:text-gray-700">
                    Home
                  </Link>
                  <svg
                    className="fill-current w-4 h-4 mx-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 8a1 1 0 0 0 0 2h7a1 1 0 1 0 0-2H6zm0-4a1 1 0 0 0 0 2h7a1 1 0 1 0 0-2H6zm0 8a1 1 0 1 0 0 2h7a1 1 0 1 0 0-2H6zm0 4a1 1 0 1 0 0 2h7a1 1 0 1 0 0-2H6zm7-12a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-4zm0 4a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-4zm0 4a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-4zm0 4a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-4z"
                    />
                  </svg>
                </li>
                <li>
                  <span className="text-gray-500">Manage Booking</span>
                </li>
              </ol>
              <Link href="/add-order">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Add Booking
                </button>
              </Link>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Invoice #</th>
                  <th className="px-4 py-2 border">Invoice Date</th>
                  <th className="px-4 py-2 border">Client Name</th>
                  <th className="px-4 py-2 border">Contact</th>
                  <th className="px-4 py-2 border">Delivery Staff</th>
                  <th className="px-4 py-2 border">Delivery Status</th>
                  <th className="px-4 py-2 border">Payment Status</th>
                  <th className="px-4 py-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order : any) => (
                  <tr key={order.order_id}>
                    <td className="px-4 py-2 border">{order.order_id}</td>
                    <td className="px-4 py-2 border">{order.order_date}</td>
                    <td className="px-4 py-2 border">{order.client_name}</td>
                    <td className="px-4 py-2 border">{order.client_contact}</td>
                    <td className="px-4 py-2 border">{order.delivery_staff}</td>
                    <td className="px-4 py-2 border">{order.delivery_status}</td>
                    <td className="px-4 py-2 border">
                      {order.payment_status === 1 && (
                        <span className="bg-green-500 text-white py-1 px-3 rounded-full text-xs">
                          Full Payment
                        </span>
                      )}
                      {order.payment_status === 2 && (
                        <span className="bg-red-500 text-white py-1 px-3 rounded-full text-xs">
                          Advance Payment
                        </span>
                      )}
                      {order.payment_status !== 1 && order.payment_status !== 2 && (
                        <span className="bg-yellow-500 text-white py-1 px-3 rounded-full text-xs">
                          No Payment
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2 border">
                      <Link href={`/editorder?id=${order.order_id}`}>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-1">
                          Edit
                        </button>
                      </Link>
                      <Link href={`/print?id=${order.order_id}`}>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-1">
                          Print
                        </button>
                      </Link>
                      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminSidebar>
  );
};


export default ManageBooking;
