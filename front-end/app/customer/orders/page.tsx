"use client";
import TrackByBooking from "@/components/Customer/TrackByBooking";
import TrackByOrder from "@/components/Customer/TrackByOrder";
import LoadingSpinner from "@/components/Items/Spinner/LoadingSpinner";
import { ToastError, ToastWarning } from "@/components/ToastError";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

const BookingDetails = () => {
  const [showData, setShowData] = useState<string>("");
  const [orderData, setOrderData] = useState<any>();
  const router = useRouter();
  const [loading, setIsLoading] = useState(true);

  const token = Cookies.get("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5057/api/User/AppliedNewConnection`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status == 204) {
          ToastError(
            "Sorry You have no any Active Connection So First Applied For connection"
          );
          setTimeout(() => {
            router.push("/customer/newConnection");
          }, 3000);
        }
        if (response.data.status == "Pending") {
          ToastWarning(
            `Your LPG No Is ${response.data.lpgNo} In Pending State!!`
          );
          router.push("/customer");
        }
        if (response.data.status == "Success") {
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
            
            if (
              response.status === 200 &&
              response.data.message === "Order not placed."
            ) {
              setOrderData(response.data.booking);
              setIsLoading(false);
              setShowData("booking");
            }
            if (
              response.status === 200 &&
              response.data.message === "Order Successfully Placed"
            ) {
              setOrderData(response.data.order);
              setIsLoading(false);
              setShowData("order");
            }
            if (
              response.status === 200 &&
              response.data.message === "No active orders for your account."
            ) {
              ToastWarning(
                "No Any Active Booking Available so First Do Booking!!"
              );
              setTimeout(() => {
                router.push("/customer/booking");
              }, 3000);
            }
          } catch (error) {
            ToastWarning(
              "No Any Active Booking Available so First Do Booking!!"
            );
            setTimeout(() => {
              router.push("/customer");
            }, 3000);
            console.error("Error fetching orders:", error);
          }
        }
        if (response.data.status == "Rejected") {
          ToastError("Your Connection Request Was Rejected Please Reapply!!");
          router.push("/customer/newConnection");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [router, token]);

  return (
    <>
      <ToastContainer />
      {loading && <LoadingSpinner />}
      {!loading && (
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
            {showData == "order" && <TrackByOrder data={orderData} />}
            {showData == "booking" && <TrackByBooking data={orderData} />}
          </div>
        </>
      )}
    </>
  );
};

export default BookingDetails;
