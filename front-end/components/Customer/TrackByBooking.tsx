"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { TbHelpSquareRounded } from "react-icons/tb";
import { TrackByBookingProps} from "../TypeInterface/AllType";
import { convertToLocalDate, getBookingStatus } from "../Enums/EnumConverter";

const TrackByBooking : React.FC<TrackByBookingProps> = ({ data }) => {
  const [staffRating, setStaffRating] = useState(0);

  const allSteps = ["Pending", "Confirmed"];

 const steps = allSteps.map((step, index) => ({
  name: step,
  status:
    data.status !== undefined &&
    data.status !== null &&
    allSteps.indexOf(getBookingStatus(data.status)) >= index
      ? "completed"
      : "upcoming",
}));

  const handleRatingChange = (value: any) => {
    setStaffRating(value);
  };

  return (
    <>
      <div className="sm:flex p-3">
        
        <div className="h-full p-1 sm:m-5 text-xs sm:text-base w-full sm:w-1/2">
          <table className="mt-2 mb-2 w-full">
            <tbody>
              <tr>
                <td className="py-1 pr-2 font-semibold">
                  Booking Date :{" "}
                  </td>
                  <td className="py-1 pr-2 font-semibold">
                  {convertToLocalDate(data?.bookingDate)}
                </td>
                </tr>
                <tr>
                <td className="py-1 pr-2 font-semibold">
                  Name :{" "}
                  </td>
                  <td className="py-1 pr-2 font-semibold">
                  {data?.consumerName}
                </td>
                </tr>
                <tr>
                <td className="py-1 pr-2 font-semibold">
                  LPG NO :{" "}
                  </td>
                  <td className="py-1 pr-2 font-semibold">
                  {data?.lpgNo}
                </td>
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
                <tr >
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
          <h4 className="text-lg font-bold underline">Order Details</h4>
          <table className="mt-2 w-full">
            <tbody>
              <tr>
                <td className="py-1 pr-2 font-semibold">Booking Id:</td>
                <td className="py-1">{data?.bookingId}</td>
              </tr>
              <tr>
                <td className="py-1 pr-2 font-semibold">Product Detail:</td>
                <td className="py-1">
                  {/* {data?.product.productName}-
                  {data?.product.brand.brandName} */}
                </td>
              </tr>
              <tr>
                <td className="py-1 pr-2 font-semibold">Payment Type:</td>
                <td className="py-1">{data?.paymentType}</td>
              </tr>
              <tr>
                <td className="py-1 pr-2 font-semibold">Payment Status:</td>
                <td className="py-1">{data?.paymentStatus}</td>
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
            <h4 className="text-lg font-bold underline m-1">Tracking Order</h4>
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
          <div className="p-3 m-1 w-full text-xs sm:text-base sm:flex items-center">
              <p className="ml-2 text-lg sm:text-xl">Need Help</p>
              <span className="ml-2">
                <TbHelpSquareRounded size={30} />
              </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackByBooking;
