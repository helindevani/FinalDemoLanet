"use client";
import AdminSidebar from "@/components/Sidebar/AdminSidebar";
import {
  convertToLocalDate,
  getBookingStatus,
  getPaymentMode,
  getPaymentStatus,
} from "@/components/Enums/EnumConverter";
import { Booking } from "@/components/TypeInterface/AllType";
import axios from "axios";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BookingDetails = () => {
  const [data, setData] = useState<Booking>();
  const pathname = usePathname();
  const bookingId = pathname.split("/")[4];

  const token = Cookies.get("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5057/api/Bookings/B/${bookingId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [bookingId, token]);

  const allSteps = ["Pending", "Confirmed"];

  const steps = allSteps.map((step, index) => ({
    name: step,
    status:
      data?.status !== undefined &&
      data.status !== null &&
      allSteps.indexOf(getBookingStatus(data.status)) >= index
        ? "completed"
        : "upcoming",
  }));

  return (
    <>
      <div className="sticky flex justify-between top-0 bg-white p-3 h-10 mb-10 sm:h-auto w-auto text-sm z-30 border">
        <h3 className="text-xl text-blue-800 font-semibold text-primary">
          Booking Details
        </h3>
        <nav className="flex items-center space-x-2">
          <a href="#" className="text-gray-400 hover:text-blue-800">
            Home
          </a>
          <span className="text-gray-400">{`>`}</span>
          <span className="text-gray-600">Booking Details</span>
        </nav>
      </div>

      <div className=" bg-white shadow-md rounded sm:p-10 m-10 w-auto  border-b ">
        <div className="sm:flex p-3">
          <div className="h-full p-1 sm:m-5 text-xs sm:text-base w-full sm:w-1/2">
            <table className="mt-2 mb-2 w-full">
              <tbody>
                <tr>
                  <td className="py-1 pr-2 font-semibold">Booking Date : </td>
                  <td className="py-1 pr-2 font-semibold">
                    {convertToLocalDate(data?.bookingDate)}
                  </td>
                </tr>
                <tr>
                  <td className="py-1 pr-2 font-semibold">Name : </td>
                  <td className="py-1 pr-2 font-semibold">
                    {data?.consumerName}
                  </td>
                </tr>
                <tr>
                  <td className="py-1 pr-2 font-semibold">LPG NO : </td>
                  <td className="py-1 pr-2 font-semibold">{data?.lpgNo}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className=" h-full p-1 sm:m-5 text-xs sm:text-base w-full sm:w-1/2">
            <h4 className="text-lg font-bold underline">Delivery Address</h4>
            <table className="mt-2 mb-2 w-full">
              <tbody>
                <tr>
                  <td className="py-1 pr-2 font-semibold">
                    Address : {data?.shippingAddress}
                  </td>
                </tr>
                <tr>
                  <td className="py-1 pr-2 font-semibold">
                    Contact No. : {data?.phoneNumber}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="sm:flex w-full p-3 m-1">
          <div className="h-full p-1 sm:m-5 text-xs sm:text-base w-full sm:w-1/2">
            <h4 className="text-lg font-bold underline">Booking Details</h4>
            <table className="mt-2 w-full">
              <tbody>
                <tr>
                  <td className="py-1 pr-2 font-semibold">Booking Id:</td>
                  <td className="py-1">{data?.bookingId}</td>
                </tr>
                <tr>
                  <td className="py-1 pr-2 font-semibold">Product Detail:</td>
                  <td className="py-1">
                    {data?.product.productName}-{data?.product.brand.brandName}
                  </td>
                </tr>
                <tr>
                  <td className="py-1 pr-2 font-semibold">Payment Type:</td>
                  <td className="py-1">{getPaymentMode(data?.paymentType)}</td>
                </tr>
                <tr>
                  <td className="py-1 pr-2 font-semibold">Payment Status:</td>
                  <td className="py-1">
                    {getPaymentStatus(data?.paymentStatus)}
                  </td>
                </tr>
                <tr>
                  <td className="py-1 pr-2 font-semibold">Amount:</td>
                  <td className="py-1">{data?.price}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="h-full p-1 sm:m-5 w-full text-xs sm:text-base sm:w-1/2">
            <div className=" p-1 m-1 w-full">
              <h4 className="text-lg font-bold underline m-1">
                Tracking Order
              </h4>
              <ul className="flex justify-between items-center w-full relative">
                {steps.map((step, index) => (
                  <li key={index} className="flex-1 text-center relative">
                    <div className="relative flex items-center justify-center">
                      {/* Line before the bullet */}
                      {index !== 0 && (
                        <div
                          className={`absolute left-0 w-1/2 h-0.5 ${
                            steps[index].status === "completed"
                              ? "bg-green-500"
                              : "bg-slate-200"
                          } transform -translate-y-1/2`}
                        ></div>
                      )}
                      {/* Line after the bullet */}
                      {index !== steps.length - 1 && (
                        <div
                          className={`absolute right-0 w-1/2 h-0.5 ${
                            step.status === "completed"
                              ? "bg-green-500"
                              : "bg-slate-200"
                          } transform -translate-y-1/2`}
                        ></div>
                      )}
                      {/* Bullet */}
                      <div
                        className={`relative w-10 h-10 rounded-full ${
                          step.status === "completed"
                            ? "bg-green-500"
                            : "bg-slate-200"
                        } flex items-center justify-center`}
                      >
                        {step.status === "completed" && (
                          <span className="text-white text-xl">&#x2713;</span>
                        )}
                      </div>
                    </div>
                    <span className="block text-xs md:text-lg mt-2">
                      {step.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
</>
  );
};

export default BookingDetails;
