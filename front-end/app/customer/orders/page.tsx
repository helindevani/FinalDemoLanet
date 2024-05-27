"use client";
import StarRating from "@/components/Items/StarRating";
import Sidebar from "@/components/Sidebar";
import axios from "axios";
import { useEffect, useState } from "react";
import { TbHelpSquareRounded } from "react-icons/tb";

const BookingDetails = () => {
  const [staffRating, setStaffRating] = useState(0);

  const [orders, setOrders] = useState([]);
  const steps = [
    { name: "Placed", status: "completed" },
    { name: "Confirmed", status: "completed" },
    { name: "On The Way", status: "active" },
    { name: "Delivered", status: "upcoming" },
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const handleRatingChange = (value: any) => {
    setStaffRating(value);
  };

  return (
    <Sidebar>
      <div className="sticky flex justify-between top-0 bg-white p-3 h-10 mb-10 sm:h-auto w-auto text-sm z-30 border">
        <h3 className="text-xl text-blue-800 font-semibold text-primary">
          Order Details
        </h3>
        <nav className="flex items-center space-x-2">
          <a href="#" className="text-gray-400 hover:text-blue-800">
            Home
          </a>
          <span className="text-gray-400">{`>`}</span>
          <span className="text-gray-600">Order Details</span>
        </nav>
      </div>

      <div className=" bg-white shadow-md rounded sm:p-10 m-10 w-auto  border-b ">
        <div className="sm:flex p-3">
          <div className=" h-full p-1 m-2 w-1/2">
            <h4 className="text-lg font-bold underline">Delivery Address</h4>
            <table className="mt-2 w-full">
              <tbody>
                <tr>
                  <td className="py-1 pr-2 font-semibold">Name:</td>
                  <td className="py-1">John Doe</td>
                </tr>
                <tr>
                  <td className="py-1 pr-2 font-semibold">Address:</td>
                  <td className="py-1">123 Main Street</td>
                </tr>
                <tr>
                  <td className="py-1 pr-2 font-semibold">Email:</td>
                  <td className="py-1">john@example.com</td>
                </tr>
                <tr>
                  <td className="py-1 pr-2 font-semibold">Phone Number:</td>
                  <td className="py-1">123-456-7890</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className=" h-full p-1 m-1 w-1/2">
          <table className="mt-2 mb-2 w-full">
              <tbody>
                <tr>
                  <td className="py-1 pr-2 font-semibold">
                    Booking Date : 
                  </td>
                  <td className="py-1 pr-2 font-semibold">
                    Order Date : 
                  </td>
                </tr>
              </tbody>
            </table>
            <h4 className="text-lg font-bold underline">More Options</h4>
            <table className="mt-2 w-full">
              <tbody>
                <tr>
                  <td className="py-1 pr-2 font-semibold">
                    <a
                      href="/download-invoice"
                      className=" py-1 pr-2 font-semibold"
                    >
                      Download Invoice
                    </a>
                  </td>
                  <td className="py-1 pr-2 font-semibold">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Download
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="sm:flex w-full p-3 m-1">
          <div className="h-full p-1 m-1 w-1/2">
            <h4 className="text-lg font-bold underline">Order Details</h4>
            <table className="mt-2 w-full">
              <tbody>
                <tr>
                  <td className="py-1 pr-2 font-semibold">Order Id:</td>
                  <td className="py-1">John Doe</td>
                </tr>
                <tr>
                  <td className="py-1 pr-2 font-semibold">Booking Id:</td>
                  <td className="py-1">John Doe</td>
                </tr>
                <tr>
                  <td className="py-1 pr-2 font-semibold">Product Detail:</td>
                  <td className="py-1">123 Main Street</td>
                </tr>
                <tr>
                  <td className="py-1 pr-2 font-semibold">Payment Type:</td>
                  <td className="py-1">john@example.com</td>
                </tr>
                <tr>
                  <td className="py-1 pr-2 font-semibold">Payment Status:</td>
                  <td className="py-1">123-456-7890</td>
                </tr>
                <tr>
                  <td className="py-1 pr-2 font-semibold">Amount:</td>
                  <td className="py-1">123-456-7890</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="h-full p-1 sm:m-5 w-full sm:w-1/2">
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
                            steps[index - 1].status === "completed"
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
                    <span className="block text-xs md:text-xs mt-2">{step.name}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="h-1/2 p-1 m-5 w-full sm:flex items-center">
                <p className="ml-2 text-xl">Need Help</p>
                <span className="ml-2">
                  <TbHelpSquareRounded size={30} />
                </span>
              
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default BookingDetails;
