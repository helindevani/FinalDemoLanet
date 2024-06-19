"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import StaffSidebar from "@/components/Sidebar/StaffSidebar";
import { ToastError, ToastSuccess, ToastWarning } from "../ToastError";

interface OrderFormValues {
  OrderId: string;
  LpgNo: string;
  ClientName: string;
  ClientContact: string;
  ClientEmail: string;
  StaffId: string;
  BookingId: string;
  Amount: string;
  PaymentType: string;
  PaymentStatus: string;
  CreatedBy: string;
  Address: string;
  ProductId: string;
  OrderStatus: string;
  IsStaffAccepted: string;
}

interface StaffActionProps {
    orderId: string;
  }

const OrderDetails: React.FC<StaffActionProps> = ({orderId}) => {
  const [staffs, setStaffs] = useState<any>();
  const [isStaffAccepted, setIsStaffAccepted] = useState<boolean>(true); 
  const router = useRouter();
  const [data, setData] = useState<any>();
  const token = Cookies.get("token");

  const [formValues, setFormValues] = useState<OrderFormValues>({
    OrderId:"",
    LpgNo: "",
    ClientName: "",
    ClientContact: "",
    ClientEmail: "",
    StaffId: "",
    BookingId: "",
    Amount: "",
    PaymentType: "",
    PaymentStatus: "",
    CreatedBy: "",
    Address: "",
    ProductId : "",
    OrderStatus :"",
    IsStaffAccepted: ""
  });

  useEffect(() => {
    if (token) {
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
            OrderId:response.data.orderId,
            LpgNo: response.data.lpgNo,
            ClientName: response.data.booking.consumerName,
            ClientContact: response.data.booking.phoneNumber,
            ClientEmail: response.data.booking.emailId,
            StaffId: response.data.staffId, 
            BookingId: response.data.booking.bookingId,
            Amount: response.data.booking.price,
            PaymentType: getPaymentMode(response.data.booking.paymentType),
            PaymentStatus: getPaymentStatus(response.data.booking.paymentStatus),
            CreatedBy: response.data.booking.createdBy,
            Address: response.data.booking.shippingAddress,
            ProductId : response.data.booking.productID,
            OrderStatus :"",
            IsStaffAccepted : response.data.isStaffAccepted
          });
          setIsStaffAccepted(response.data.isStaffAccepted);
          axios
            .get(`http://localhost:5057/api/Staffs`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
            .then((staffResponse) => {
              setStaffs(staffResponse.data);
            })
            .catch((error) => console.error("Error fetching staff data:", error));
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

  console.log(formValues);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!isStaffAccepted){
        formValues.OrderStatus="Placed";
    }

    try {
        const response = await axios.put(`http://localhost:5057/api/Orders/${orderId}`, formValues, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        ToastSuccess("Order Status Updated Successfully!!")
        router.push("/staff/orders");
    } catch (error) {
      ToastError("Failed To Update Order Status!!")
        console.error("Error updating order:", error);
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
        return "COD";
      default:
        return "";
    }
  };

  return (
    
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
                            value={data ? data.booking.product.productName + "-" + data.booking.product.brand.brandName : ""}
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
                          htmlFor="OrderStatus"
                          className="block text-sm font-semibold leading-6 text-gray-900"
                        >
                          Order Status
                        </label>
                        <div className="mt-2.5">
                          <select
                            className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="OrderStatus"
                            value={formValues.OrderStatus}
                            onChange={handleChange}
                          >
                            <option value="">---SELECT---</option>
                            <option value="OnTheWay">On The Way</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Rejected">Rejected</option>
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
                          <input
                            type="text"
                            name="PaymentStatus"
                            id="PaymentStatus"
                            value={formValues.PaymentStatus}
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
                      Update Order
                    </button>
                  </div>
                </div>
              </form>

  );
};

export default OrderDetails;
