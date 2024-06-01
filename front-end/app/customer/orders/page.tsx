"use client";
import TrackByBooking from "@/components/Customer/TrackByBooking";
import TrackByOrder from "@/components/Customer/TrackByOrder";
import StarRating from "@/components/Items/StarRating";
import Sidebar from "@/components/Sidebar";
import { RootState } from "@/store";

import { Order } from "@/store/orderSlice";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TbHelpSquareRounded } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";

const BookingDetails = () => {
  const [staffRating, setStaffRating] = useState(0);
  const [showData, setShowData]=useState<string>("");
  const [orderData, setOrderData] = useState<any>();
  const router=useRouter();

  const token = Cookies.get("token");
  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5057/api/Bookings/BookingDetails",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200 && response.data.message === 
        "Order not placed.") {
          setOrderData(response.data.booking);
          setShowData("booking");
        console.log("Booking is pending");
      }
        if (response.status === 200 && response.data.message === "Order Successfully Places" ) {
          setOrderData(response.data.order);
          setShowData("order");
          console.log("Order is not delivered");
        }
      if (
        response.status === 200 &&
        response.data.message === "No active orders for your account."
      ) {
        router.push('/customer/booking')
        console.log("No active orders for your account.");
      }
      // }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  useEffect(() => {
    if (!orderData) {
      fetchOrders();
    }
  }, [orderData]);

  const handleRatingChange = (value: any) => {
    setStaffRating(value);
  };


  return (
    <>
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
        {showData == "order" && <TrackByOrder data={orderData}/>}
        {showData == "booking" && <TrackByBooking data={orderData}/>}
      </div>
    </>
  );
};

export default BookingDetails;
