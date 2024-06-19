'use client';

import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import StaffChartComponent from "@/components/Items/StaffChart";

const Dashboard = () => {
  const [activeOrders, setActiveOrders] = useState<number>(0);
  const [deliveredOrders, setDeliveredOrders] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);
  const [data, setData] = useState<any>(null);
  const token=Cookies.get('token');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5057/api/Staffs/Dashboard",{headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }}
        );
        const { AverageRating, TotalActiveOrders, TotalDeliveredOrders} = response.data;
        setData(response.data);
        setActiveOrders(TotalActiveOrders);
        setDeliveredOrders(TotalDeliveredOrders);
        setRating(AverageRating);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <>
 <div className="flex justify-between top-0 bg-white border border-gray-300 p-3 h-screen mb-8 sm:h-auto w-auto text-sm"></div>
      <div className="grid grid-cols-3 gap-4 p-5 mb-4">
        <div className="bg-slate-400 text-white p-4 rounded-lg sm:text-sm">
          <h2 className="text-xl font-semibold">Total Active Orders</h2>
          <p className="text-4xl font-bold">{activeOrders}</p>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Total Delivered Order</h2>
          <p className="text-4xl font-bold">{deliveredOrders}</p>
        </div>
        <div className="bg-purple-500 text-white p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Average Rating</h2>
          <p className="text-4xl font-bold">{rating} <span>&#9733;</span></p>
        </div>
      </div>

      <div className="bg-white shadow-md rounded px-8 p-5 m-10 w-auto h-auto">
          <StaffChartComponent data={data} />
        </div>

    </>
  );
}

export default Dashboard;


