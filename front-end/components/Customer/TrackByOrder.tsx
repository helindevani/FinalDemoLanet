"use client";
import {  useState } from "react";
import { TbHelpSquareRounded } from "react-icons/tb";
import { TrackByOrderProps } from "../TypeInterface/AllType";
import { convertToLocalDate, getOrderStatus, getPaymentMode, getPaymentStatus } from "../Enums/EnumConverter";


const TrackByOrder : React.FC<TrackByOrderProps> = ({ data }) => {
  const [staffRating, setStaffRating] = useState(0);

  const allSteps = ["Placed", "Confirmed", "OnTheWay", "Delivered"];

 const steps = allSteps.map((step, index) => ({
  name: step,
  status:
    data.orderStatus !== undefined &&
    data.orderStatus !== null &&
    allSteps.indexOf(getOrderStatus(data.orderStatus)) >= index
      ? "completed"
      : "upcoming",
}));

  return (
    <>
      <div className="sm:flex p-3">
        <div className=" h-full p-1 m-2 w-1/2">
          <h4 className="text-lg font-bold underline">Delivery Address</h4>
          <table className="mt-2 w-full">
            <tbody>
              <tr>
                <td className="py-1 pr-2 font-semibold">Name:</td>
                <td className="py-1">{data?.clientName}</td>
              </tr>
              <tr>
                <td className="py-1 pr-2 font-semibold">Address:</td>
                <td className="py-1">{data?.address}</td>
              </tr>
              <tr>
                <td className="py-1 pr-2 font-semibold">Email:</td>
                <td className="py-1">{data?.clientEmail}</td>
              </tr>
              <tr>
                <td className="py-1 pr-2 font-semibold">Phone Number:</td>
                <td className="py-1">{data?.clientContact}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className=" h-full p-1 m-1 w-1/2">
          <table className="mt-2 mb-2 w-full">
            <tbody>
              <tr>
                <td className="py-1 pr-2 font-semibold">
                  Booking Date :{" "}
                  {convertToLocalDate(data?.booking.bookingDate)}
                </td>
                <td className="py-1 pr-2 font-semibold">
                  Order Date : {convertToLocalDate(data?.orderDate)}
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
                <td className="py-1">{data?.orderId}</td>
              </tr>
              <tr>
                <td className="py-1 pr-2 font-semibold">Booking Id:</td>
                <td className="py-1">{data?.bookingId.split("-").join("")}</td>
              </tr>
              <tr>
                <td className="py-1 pr-2 font-semibold">Product Detail:</td>
                <td className="py-1">
                  {data?.booking.product.productName}-
                  {data?.booking.product.brand.brandName}
                </td>
              </tr>
              <tr>
                <td className="py-1 pr-2 font-semibold">Payment Type:</td>
                <td className="py-1">{getPaymentMode(data?.paymentType)}</td>
              </tr>
              <tr>
                <td className="py-1 pr-2 font-semibold">Payment Status:</td>
                <td className="py-1">{getPaymentStatus(data?.paymentStatus)}</td>
              </tr>
              <tr>
                <td className="py-1 pr-2 font-semibold">Amount:</td>
                <td className="py-1">{data?.amount}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="h-full p-1 sm:m-5 w-full sm:w-1/2">
          <div className=" p-1 m-1 w-full">
            <h4 className="text-lg font-bold underline m-1">Tracking Order</h4>
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
                  <span className="block text-xs md:text-lg mt-2">
                    {step.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="h-1/2 p-1 m-1 w-full sm:flex items-center">
              <p className="ml-2 text-xl">Need Help</p>
              <span className="ml-2">
                <TbHelpSquareRounded size={30} />
              </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackByOrder;

