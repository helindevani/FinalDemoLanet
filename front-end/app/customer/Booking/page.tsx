"use client";
import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { ToastError } from "@/components/ToastError";
import { ToastContainer } from "react-toastify";

const stripePromise = loadStripe(
  "pk_test_51PHNghSJ9wEfpjx5wXi25pxsX2zIg30sO9fFPA1xyIeJ01SqEazYAi8SmKUCPkY4OrJ1Z5mRp84SUZ6T03LcDqJr00Vs5XSeZD"
);

export default function Booking() {
  const [data, setData] = useState<any>();
  const [paymentType, setPaymentType] = useState<string>();
  const token = Cookies.get("token");
  const router = useRouter();

  useEffect(() => {
    if (token) {
      const response = axios
        .get(`http://localhost:5057/api/Bookings/Details`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => setData(response.data))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [token]);

  const handleBooking = async (event: any) => {
    event.preventDefault();
    if (!data) return;

    const bookingData = {
      ConsumerName:
        data.approvedConnection[0].firstName +
        " " +
        data.approvedConnection[0].lastName,
      LpgNo: data.approvedConnection[0].lpgNo,
      EmailId: data.approvedConnection[0].emailId,
      PhoneNumber: data.approvedConnection[0].phoneNumber,
      ProductID: data.approvedConnection[0].product.productId,
      CreatedBy: data.approvedConnection[0].userId,
      ShippingAddress: data.approvedConnection[0].address,
      Price: parseFloat(data.cylinderPrice),
      PaymentType: paymentType,
      PaymentStatus: "Pending",
    };

    
      if(paymentType=="Online"){
        try {
          const response = await axios.post(
            "http://localhost:5057/api/Bookings/checkout",
            bookingData,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
          const { url } = response.data;
          window.location.href = url;
        } catch (error) {
          console.error("Error creating Stripe Checkout session:", error);
        }
      }
      else{
        try {
          const response = await axios.post(
            "http://localhost:5057/api/Bookings",
            bookingData,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if(response.status==201){
            console.log("Booking Request Add Successfully!!");
            router.push('/customer/orders');
          }
          else if (response.status === 200 && response.data === "Last booking is pending.") {
            ToastError("Last booking is pending.");
        }
        else if (response.status === 200 && response.data === "Order is placed. Please wait for delivery.") {
          ToastError("Your Last Booking Will Be Confirmed Please Wait For Delivery Of Your Order.");
          router.push('/customer/orders');
      }
        } catch (error) {
          console.error("Error creating Stripe Checkout session:", error);
        }
      }
      
  };
  console.log(data);

  return (
    <>
      <ToastContainer/>
      <div className="page-wrapper">
        <div className="sticky flex justify-between top-0 bg-white p-3 h-10 mb-10 sm:h-auto w-auto text-sm z-30 border">
          <h3 className="text-xl text-blue-800 font-semibold text-primary">
            Book Your Cylinder
          </h3>
          <nav className="flex items-center space-x-2">
            <a href="#" className="text-gray-400 hover:text-blue-800">
              Home
            </a>
            <span className="text-gray-400">{`>`}</span>
            <span className="text-gray-600">Book Your Cylinder</span>
          </nav>
        </div>
        <div className="container m-auto h-screen">
          <div className="max-w-4xl mx-auto h-screen">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-6 m-10 w-auto h-auto">
              <form className="space-y-4 px-5 py-8" onSubmit={handleBooking}>
                <div className="flex items-center">
                  <label className="w-1/4 text-gray-700" htmlFor="LpgNo">
                    LPG Connection No
                  </label>
                  <input
                    className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="LpgNo"
                    type="text"
                    value={data ? data.approvedConnection[0].lpgNo : ""}
                    disabled
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-1/4 text-gray-700" htmlFor="Name">
                    Consumer Name
                  </label>
                  <input
                    className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="Name"
                    name="Name"
                    type="text"
                    value={
                      data
                        ? data.approvedConnection[0].firstName +
                          " " +
                          data.approvedConnection[0].lastName
                        : ""
                    }
                    disabled
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-1/4 text-gray-700" htmlFor="PhoneNumber">
                    Register Phone No
                  </label>
                  <input
                    className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="PhoneNumber"
                    name="PhoneNumber"
                    type="text"
                    value={data ? data.approvedConnection[0].phoneNumber : ""}
                    disabled
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-1/4 text-gray-700" htmlFor="EmailId">
                    Consumer Email Id
                  </label>
                  <input
                    className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="EmailId"
                    name="EmailId"
                    type="text"
                    value={data ? data.approvedConnection[0].emailId : ""}
                    disabled
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-1/4 text-gray-700" htmlFor="Product">
                    Product Details
                  </label>
                  <input
                    className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="Product"
                    name="Product"
                    type="text"
                    value={
                      data
                        ? data.approvedConnection[0].product.productName +
                          "-" +
                          data?.approvedConnection[0].product.brand.brandName
                        : ""
                    }
                    disabled
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-1/4 text-gray-700" htmlFor="Price">
                    Cylinder Price
                  </label>
                  <input
                    className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="Price"
                    name="Price"
                    type="text"
                    value={data ? data.cylinderPrice : ""}
                    disabled
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-1/4 text-gray-700" htmlFor="Address">
                    Shipping Address
                  </label>
                  <textarea
                    className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="Address"
                    name="Address"
                    rows={2}
                    value={data ? data.approvedConnection[0].address : ""}
                    disabled
                  ></textarea>
                </div>

                <div className="flex items-center">
                  <label className="w-1/4 text-gray-700" htmlFor="PaymentType">
                    Payment Type
                  </label>
                  <select
                    className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="PaymentType"
                    name="PaymentType"
                    value={paymentType}
                    onChange={(e) => setPaymentType(e.target.value)}
                  >
                    <option value="">--SELECT--</option>
                    <option value="Online">Online</option>
                    <option value="CashOnDelivery">Cash On Delivery</option>
                  </select>
                </div>

                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    id="createProductBtn"
                    className="bg-blue-800 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Book
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
