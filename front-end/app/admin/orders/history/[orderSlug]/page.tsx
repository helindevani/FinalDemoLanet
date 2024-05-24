"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";

const OrderDetails: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const bookingId = pathname.split("/")[4];
  const [data, setData] = useState<any>();
  const token = Cookies.get("token");

 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5057/api/Bookings/b${bookingId}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [token,bookingId]);

  const getPaymentStatus = (value: number): string => {
    switch (value) {
      case 0:
        return "Pending";
      case 1:
        return "Success";
      case 2:
        return "Failed";
      default:
        return "";
    }
  };

  const getBookingStatus = (value: number): string => {
    switch (value) {
      case 0:
        return "Pending";
      case 1:
        return "Confirmed";
      case 2:
        return "Canceled";
      default:
        return "";
    }
  };

  const getPaymentMode = (value: number): string => {
    switch (value) {
      case 0:
        return "Online";
      case 1:
        return "COD";
      default:
        return "";
    }
  };

  function convertToLocalDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0'); 
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear(); 
    return `${day}-${month}-${year}`;
  }

  return (
    <AdminSidebar>
      <div className="page-wrapper">
        <div className="sticky flex justify-between top-0 bg-white p-3 h-10 mb-10 sm:h-auto w-auto text-sm z-30 border">
          <h3 className="text-xl text-blue-800 font-semibold text-primary">
          User Booking Details
          </h3>
          <nav className="flex items-center space-x-2">
            <a href="#" className="text-gray-400 hover:text-blue-800">
              Home
            </a>
            <span className="text-gray-400">{`>`}</span>
            <span className="text-gray-600">Booking Detail</span>
          </nav>
        </div>
        <div className="container m-auto h-screen">
          <div className="w-auto">
            <div className="bg-white shadow-md rounded px-8 pt-14 pb-16 m-10 w-auto h-auto">
              <form >
                <div className="border">
                  <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 p-5">
                    <div className="flex ">
                      <div className="pr-4 w-1/2">
                        <label
                          htmlFor="LpgNo"
                          className="block text-sm font-semibold leading-6 text-gray-900"
                        >
                          LPG NO.
                        </label>
                        <div className="mt-2.5">
                          <input
                            type="text"
                            name="LpgNo"
                            id="LpgNo"
                            value={data ? data.lpgNo : ""}
                            className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            disabled
                          />
                        </div>
                      </div>
                      <div className="pr-4 w-1/2">
                        <label
                          htmlFor="BookingId"
                          className="block text-sm font-semibold leading-6 text-gray-900"
                        >
                          Booking Id
                        </label>
                        <div className="mt-2.5">
                          <input
                            type="text"
                            name="BookingId"
                            id="BookingId"
                            value={data ? data.bookingId : ""}
                            className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex ">
                      <div className="pr-4 w-1/2">
                        <label
                          htmlFor="ClientContact"
                          className="block text-sm font-semibold leading-6 text-gray-900"
                        >
                          Client Name
                        </label>
                        <div className="mt-2.5">
                          <input
                            type="text"
                            name="ClientName"
                            id="ClientName"
                            value={data ? data.consumerName : ""}
                            className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            disabled
                          />
                        </div>
                      </div>
                      <div className="pr-4 w-1/2">
                        <label
                          htmlFor="BookingDate"
                          className="block text-sm font-semibold leading-6 text-gray-900"
                        >
                          Booking Date
                        </label>
                        <div className="mt-2.5">
                          <input
                            type="text"
                            name="BookingDate"
                            id="BookingDate"
                            value={data ? convertToLocalDate(data.bookingDate) : ""}
                            className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="Address"
                        className="block text-sm font-semibold leading-6 text-gray-900"
                      >
                        Address
                      </label>
                      <div className="mt-2.5">
                        <textarea
                          name="Address"
                          id="Address"
                          rows={2}
                          value={data ? data.shippingAddress : ""}
                          className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          disabled
                        ></textarea>
                      </div>
                    </div>
                    <div className="flex ">
                      <div className="pr-4 w-1/2">
                        <label
                          htmlFor="ProductId"
                          className="block text-sm font-semibold leading-6 text-gray-900"
                        >
                          Product Details
                        </label>
                        <div className="mt-2.5">
                          <input
                            type="text"
                            name="ProductId"
                            id="ProductId"
                            value={data ? data.product + "-" + data.product.brand.brandName : ""}
                            className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            disabled
                          />
                        </div>
                      </div>
                      <div className="pr-4 w-1/2">
                        <label
                          htmlFor="Amount"
                          className="block text-sm font-semibold leading-6 text-gray-900"
                        >
                          Amount
                        </label>
                        <div className="mt-2.5">
                          <input
                            type="text"
                            name="Amount"
                            id="Amount"
                            value={data ? data.price : ""}
                            className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex ">
                      <div className="pr-4 w-1/2">
                        <label
                          htmlFor="BookingStatus"
                          className="block text-sm font-semibold leading-6 text-gray-900"
                        >
                          Booking Status
                        </label>
                        <div className="mt-2.5">
                          <input
                            type="text"
                            name="BookingStatus"
                            id="BookingStatus"
                            value={data ? getPaymentMode(data.status) : ""}
                            className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            disabled
                          />
                        </div>
                      </div>
                      <div className="pr-4 w-1/2">
                        <label
                          htmlFor="PaymentType"
                          className="block text-sm font-semibold leading-6 text-gray-900"
                        >
                          Payment Mode
                        </label>
                        <div className="mt-2.5">
                          <input
                            type="text"
                            name="PaymentType"
                            id="PaymentType"
                            value={data ? getPaymentMode(data.paymentType) : ""}
                            className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex ">
                      <div className="pr-4 w-1/2">
                        <label
                          htmlFor="PaymentStatus"
                          className="block text-sm font-semibold leading-6 text-gray-900"
                        >
                          Payment Status
                        </label>
                        <div className="mt-2.5">
                          <input
                            type="text"
                            name="PaymentStatus"
                            id="PaymentStatus"
                            value={data ? getPaymentStatus(data.paymentStatus) : ""}
                            className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            disabled
                          />
                        </div>
                      </div>
                      <div className="pr-4 w-1/2">
                        <label
                          htmlFor="PaymentDate"
                          className="block text-sm font-semibold leading-6 text-gray-900"
                        >
                          Payment Date
                        </label>
                        <div className="mt-2.5">
                          <input
                            type="text"
                            name="PaymentDate"
                            id="PaymentDate"
                            value={data ? convertToLocalDate(data.PaymentDate) : ""}
                            className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AdminSidebar>
  );
};

export default OrderDetails;
