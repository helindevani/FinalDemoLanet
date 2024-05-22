"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import StaffSidebar from "@/components/Sidebar/StaffSidebar";

const OrderDetails: React.FC = () => {
  const [staffs, setStaffs] = useState<any>();
  const router = useRouter();
  const [data, setData] = useState<any>();
  const token = Cookies.get("token");
  const pathname = usePathname();
  const orderId = pathname.split("/")[3];

  const [formValues, setFormValues] = useState({
    LpgNo: "",
    ClientName: "",
    ClientContact: "",
    ClientEmail: "",
    Status: "",
    BookingId: "",
    Amount: "",
    PaymentType: "",
    PaymentStatus: "",
    CreatedBy: "",
    Address: "",
  });

  useEffect(() => {
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken.sub;
      axios
        .get(`http://localhost:5057/api/Orders/${orderId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setData(response.data);
          setStaffs(response.data.staff);
          setFormValues({
            LpgNo: response.data.order.lpgNo,
            ClientName: response.data.order.consumerName,
            ClientContact: response.data.order.phoneNumber,
            ClientEmail: response.data.order.emailId,
            Status: response.data.order.status, 
            BookingId: response.data.order.bookingId,
            Amount: response.data.order.price,
            PaymentType: getPaymentMode(response.data.order.paymentType),
            PaymentStatus: getPaymentStatus(response.data.order.paymentStatus),
            CreatedBy: response.data.order.createdBy,
            Address: response.data.order.shippingAddress,
          });
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [orderId,token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handlePaymentStatusChange = (value: string) => {
    setFormValues(prevValues => ({
      ...prevValues,
      PaymentStatus: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5057/api/Orders/${orderId}`, formValues, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Order created successfully:", response.data);
      // Handle success response, redirect or show success message
    } catch (error) {
      console.error("Error creating order:", error);
      // Handle error response, show error message
    }
  };

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

  const getPaymentMode = (value: number): string => {
    switch (value) {
      case 0:
        return "Online";
      case 1:
        return "CashOnDelivery";
      default:
        return "";
    }
  };

  return (
    <StaffSidebar>
      <div className="page-wrapper">
        <div className="sticky flex justify-between top-0 bg-white p-3 h-10 mb-10 sm:h-auto w-auto text-sm z-30 border">
          <h3 className="text-xl text-blue-800 font-semibold text-primary">
            Order Creation
          </h3>
          <nav className="flex items-center space-x-2">
            <a href="#" className="text-gray-400 hover:text-blue-800">
              Home
            </a>
            <span className="text-gray-400">{`>`}</span>
            <span className="text-gray-600">Order Creation</span>
          </nav>
        </div>
        <div className="container m-auto h-screen">
          <div className="w-auto">
            <div className="bg-white shadow-md rounded px-8 pt-14 pb-16 m-10 w-auto h-auto">
              <form onSubmit={handleSubmit}>
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
                            value={formValues.LpgNo}
                            className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            disabled
                          />
                        </div>
                      </div>
                      <div className="pr-4 w-1/2">
                        <label
                          htmlFor="ClientName"
                          className="block text-sm font-semibold leading-6 text-gray-900"
                        >
                          Client Name
                        </label>
                        <div className="mt-2.5">
                          <input
                            type="text"
                            name="ClientName"
                            id="ClientName"
                            value={formValues.ClientName}
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
                          Client Contact
                        </label>
                        <div className="mt-2.5">
                          <input
                            type="text"
                            name="ClientContact"
                            id="ClientContact"
                            value={formValues.ClientContact}
                            className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            disabled
                          />
                        </div>
                      </div>
                      <div className="pr-4 w-1/2">
                        <label
                          htmlFor="ClientEmail"
                          className="block text-sm font-semibold leading-6 text-gray-900"
                        >
                          Client Email
                        </label>
                        <div className="mt-2.5">
                          <input
                            type="text"
                            name="ClientEmail"
                            id="ClientEmail"
                            value={formValues.ClientEmail}
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
                          value={formValues.Address}
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
                           // value={data ? data.booking.product.productName + "-" + data.booking.product.brand.brandName : ""}
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
                            value={formValues.Amount}
                            className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex ">
                      <div className="pr-4 w-1/2">
                        <label
                          htmlFor="StaffId"
                          className="block text-sm font-semibold leading-6 text-gray-900"
                        >
                          Order Status
                        </label>
                        <div className="mt-2.5">
                          <select
                            className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="StaffId"
                            name="StaffId"
                            value={formValues.Status}
                            onChange={handleChange}
                          >
                            <option value="">---SELECT---</option>
                            <option value="0">Placed</option>
                            <option value="1">Confirmed</option>
                            <option value="2">On The Way</option>
                            <option value="3">Delivered</option>
                            <option value="4">Rejected</option>
                          </select>
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
                            value={formValues.PaymentType}
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
                        {formValues.PaymentType !== "online" ? (
        <select
          name="PaymentStatus"
          id="PaymentStatus"
          value={formValues.PaymentStatus}
          onChange={(e) => handlePaymentStatusChange(e.target.value)}
          className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
        </select>
      ) : (
        <input
          type="text"
          name="PaymentStatus"
          id="PaymentStatus"
          value={formValues.PaymentStatus}
          className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          disabled
        />
      )}
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
                            value={data ? data.booking.paymentDate : ""}
                            className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center p-4">
                    <button
                      type="submit"
                      id="createProductBtn"
                      className="bg-blue-800 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Update Status
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </StaffSidebar>
  );
};

export default OrderDetails;
