"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "@/components/Sidebar/AdminSidebar";
import ChartComponent from "@/components/Items/Chart";
import { Booking } from "@/components/TypeInterface/AllType";
import Cookies from "js-cookie";

const Dashboard: React.FC = () => {
  const [countProduct, setCountProduct] = useState<number>(0);
  const [countOrder, setCountOrder] = useState<number>(0);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [countSuppliers, setCountSuppliers] = useState<number>(0);
  const [userWiseBooking, setUserWiseBooking] = useState<Booking[]>([]);
  const [data, setData] = useState<any>(null);
  const token= Cookies.get('token');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5057/api/Admin/Dashboard",
          {headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }},
        );
        const { TotalCylinder, TotalSupplier, TotalBooking, TotalRevenue } = response.data;
        setData(response.data);
        setCountProduct(TotalCylinder);
        setCountSuppliers(TotalSupplier);
        setCountOrder(TotalBooking);
        setTotalRevenue(TotalRevenue);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  useEffect(() => {
    const fetchUserWiseBookingData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5057/api/Admin/UserWiseBooking",
          {headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }}
        );
        setUserWiseBooking(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserWiseBookingData();
  }, []);

  return (
    <>
      <div className="flex justify-between top-0 bg-white border border-gray-300 p-3 h-10 mb-8 sm:h-auto w-auto text-sm"></div>
      <div className="grid grid-cols-4 gap-4 p-5 mb-4">
        <div className="bg-green-500 text-white p-4 rounded-lg sm:text-sm">
          <h2 className="text-xl font-semibold">Total Cylinder</h2>
          <p className="text-4xl font-bold">{countProduct}</p>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Total Suppliers</h2>
          <p className="text-4xl font-bold">{countSuppliers}</p>
        </div>
        <div className="bg-purple-500 text-white p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Total Booking</h2>
          <p className="text-4xl font-bold">{countOrder}</p>
        </div>
        <div className="bg-teal-500 text-white p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Total Revenue</h2>
          <p className="text-4xl font-bold">{totalRevenue} ₹</p>
        </div>
      </div>

      <div className="bg-white shadow-md sm:flex rounded px-8 p-5 m-10 w-auto h-auto">
        <div className="w-1/2 border p-3 m-1">
          <ChartComponent data={data} />
        </div>
        <div className="w-1/2 border p-3 justify-between m-1">
          <h2 className="text-xl p-2 border-b border-gray-300">
            User Wise Booking
          </h2>
          <table className="w-full overflow-y-auto">
            <thead className="bg-white">
              <tr>
                <th className="p-3 border border-b border-gray-300 text-gray-600">Name</th>
                <th className="p-3 border border-b border-gray-300 text-gray-600">Booking Amount</th>
              </tr>
            </thead>
            <tbody>
              {userWiseBooking.map((user, index) => (
                <tr key={index} className="bg-gray-100">
                  <td className="border border-gray-300 p-2 text-left">{user.consumerName}</td>
                  <td className="border border-gray-300 p-2 text-right">{user.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
