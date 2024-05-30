"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "@/components/AdminSidebar";

const Dashboard: React.FC = () => {
  const [countProduct, setCountProduct] = useState();
  const [countOrder, setCountOrder] = useState<number>(0);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [countSuppliers, setCountSuppliers] = useState<number>(0);
  const [lowStockProducts, setLowStockProducts] = useState<any[]>([]);
  const [userWiseBooking, setUserWiseBooking] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5057/api/Admin/Dashboard");
        console.log(response.data.TotalCylinder,response.data,typeof response.data.TotalSupplier )
        const tc =response.data.TotalCylinder
        setCountProduct(tc);
        setCountSuppliers(response.data.TotalSupplier);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);


  console.log(countProduct)
  console.log(countSuppliers)
  return (
    <AdminSidebar>
      <div className="page-wrapper">
        <div className="flex justify-between top-0 bg-white border border-gray-300 p-3 h-10 mb-8 sm:h-auto w-auto text-sm"></div>
        <div className="grid grid-cols-4 gap-4 p-5 mb-4">
          <div className="bg-green-500 text-white p-4 rounded-lg sm:text-sm">
            <h2 className="text-xl font-semibold">Total Cylinder</h2>
            <p className="text-4xl font-bold">{countProduct}</p>
          </div>
          <div className="bg-yellow-500 text-white p-4 rounded-lg">
            <h2 className="text-xl font-semibold">Total Suppliers</h2>
            <p className="text-4xl font-bold">{countSuppliers} </p>
          </div>
          <div className="bg-purple-500 text-white p-4 rounded-lg">
            <h2 className="text-xl font-semibold">Total Booking</h2>
            <p className="text-4xl font-bold">{countOrder}</p>
          </div>
          <div className="bg-teal-500 text-white p-4 rounded-lg">
            <h2 className="text-xl font-semibold ">Total Revenue</h2>
            <p className="text-4xl font-bold">{totalRevenue} $</p>
          </div>
          
        </div>

        <div className="bg-white shadow-md rounded px-8 p-5 m-10 w-auto h-auto">
          <div className="table-responsive justify-between">
            <h2 className="text-xl p-2 border-b border-gray-300 bg-gray-100">
              User Wise Booking
            </h2>
            <table className="w-full ">
              <thead className="bg-white">
                <tr>
                  <th className="p-3 border border-b border-gray-300 text-gray-600">
                    Name
                  </th>
                  <th className="p-3 border border-b border-gray-300 text-gray-600 ">
                    Booking Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-100">
                  <td className="border border-gray-300 p-2 text-left">
                    helin
                  </td>
                  <td className="border border-gray-300 p-2 text-right">900</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminSidebar>
  );
};

export default Dashboard;
