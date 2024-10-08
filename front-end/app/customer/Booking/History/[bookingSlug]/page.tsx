"use client";
import { convertToLocalDate, getPaymentMode, getPaymentStatus } from "@/components/Enums/EnumConverter";
import StarRating from "@/components/Items/StarRating";
import { AppDispatch, RootState } from "@/store";
import { Order, fetchOrderById } from "@/store/orderSlice";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { TbHelpSquareRounded } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import Link from "next/link";

const BookingDetails = () => {
  const [staffRating, setStaffRating] = useState<number | null>(null);
  const pathname = usePathname();
  const orderId = pathname.split("/")[4];
  const dispatch = useDispatch<AppDispatch>();
  const order: Order | undefined = useSelector((state: RootState) =>
    state.order.orders.find((order) => order.orderId=== orderId)
  );

const token=Cookies.get("token");
  const allSteps = ["Placed", "Confirmed", "On The Way", "Delivered"];

  const getOrderStatus = (value: number): string => {
    switch (value) {
      case 0:
        return "Placed";
        case 1:
        return "Confirmed";
        case 2:
        return "On The Way";
      case 3:
        return "Delivered";
        case 4:
          return "Canceled"
      default:
        return "";
    }
  };
  
  const steps = allSteps.map((step, index) => ({
    name: step,
    status:
      order?.orderStatus && allSteps.indexOf(getOrderStatus(order.orderStatus)) >= index
        ? "completed"
        : "upcoming",
  }));

  useEffect(() => {
    const fetchOrders = async () => {
      await dispatch(fetchOrderById(orderId));
      if (order && order.staffRating !== null) {
        setStaffRating(order.staffRating);
      }
    };
    fetchOrders();
  }, [dispatch, orderId, order]);

  const handleRatingChange = async (value: number) => {
    setStaffRating(value);
    console.log(value);
    try {
      await axios.post(`http://localhost:5057/api/User/StaffRating?id=${orderId}&rating=${value}`, null, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Failed to submit rating:", error);
    }
  };

  const downloadInvoice = async () => {
    try {
      const response = await axios.get(`http://localhost:5057/api/User/DownloadInvoice?id=${orderId}`, {
        responseType: 'blob', 
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Invoice.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading the invoice', error);
    }
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
        <div className="sm:flex p-3">
          <div className=" h-full p-1 m-2 w-1/2">
            <h4 className="text-lg font-bold underline">Delivery Address</h4>
            <table className="mt-2 w-full">
              <tbody>
                <tr>
                  <td className="py-1 pr-2 font-semibold">Name:</td>
                  <td className="py-1">{order?.clientName}</td>
                </tr>
                <tr>
                  <td className="py-1 pr-2 font-semibold">Address:</td>
                  <td className="py-1">{order?.address}</td>
                </tr>
                <tr>
                  <td className="py-1 pr-2 font-semibold">Email:</td>
                  <td className="py-1">{order?.clientEmail}</td>
                </tr>
                <tr>
                  <td className="py-1 pr-2 font-semibold">Phone Number:</td>
                  <td className="py-1">{order?.clientContact}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className=" h-full p-1 m-1 w-1/2">
          <table className="mt-2 mb-2 w-full">
              <tbody>
                <tr>
                  <td className="py-1 pr-2 font-semibold">
                    Booking Date : {convertToLocalDate(order?.booking.bookingDate )}
                  </td>
                  <td className="py-1 pr-2 font-semibold">
                    Order Date : {convertToLocalDate(order?.orderDate )}
                  </td>
                </tr>
              </tbody>
            </table>
            <h4 className="text-lg font-bold underline">More Options</h4>
            <table className="mt-2 w-full">
              <tbody>
                <tr>
                  <td className="py-1 pr-2 font-semibold">
                    <Link
                      href="/download-invoice"
                      className=" py-1 pr-2 font-semibold"
                    >
                      Download Invoice
                    </Link>
                  </td>
                  <td className="py-1 pr-2 font-semibold">
                    <button onClick={downloadInvoice} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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
                  <td className="py-1">{order?.orderId}</td>
                </tr>
                <tr>
                  <td className="py-1 pr-2 font-semibold">Booking Id:</td>
                  <td className="py-1">{order?.bookingId}</td>
                </tr>
                <tr>
                  <td className="py-1 pr-2 font-semibold">Product Detail:</td>
                  <td className="py-1">{order?.booking.product.productName}-{order?.booking.product.brand.brandName}</td>
                </tr>
                <tr>
                  <td className="py-1 pr-2 font-semibold">Payment Type:</td>
                  <td className="py-1">{getPaymentMode(order?.paymentType)}</td>
                </tr>
                <tr>
                  <td className="py-1 pr-2 font-semibold">Payment Status:</td>
                  <td className="py-1">{getPaymentStatus(order?.paymentStatus)}</td>
                </tr>
                <tr>
                  <td className="py-1 pr-2 font-semibold">Amount:</td>
                  <td className="py-1">{order?.amount}</td>
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
                            steps[index ].status === "completed"
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
                    <span className="block text-xs md:text-lg mt-2">{step.name}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="h-1/2 p-1 m-1 w-full sm:flex items-center">
              <div className="flex-1">
              <StarRating
                  onChange={handleRatingChange}
                  size="4xl"
                  initialRating={staffRating}
                  isDisabled={staffRating !== null} 
                />
              </div>
              <div className="flex-1 flex sm:justify-end items-center">
                <p className="ml-2 text-xl">Need Help</p>
                <span className="ml-2">
                  <TbHelpSquareRounded size={30} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default BookingDetails;
