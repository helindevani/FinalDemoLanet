"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import StaffSidebar from "@/components/Sidebar/StaffSidebar";

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
  IsStaffAccepted: boolean | null;
}

interface StaffActionProps {
  orderId: string;
}

const StaffAction: React.FC<StaffActionProps> = ({orderId}) => {
  const router = useRouter();
  const [data, setData] = useState<any>();
  const token = Cookies.get("token");

  const [formValues, setFormValues] = useState<OrderFormValues>({
    OrderId: "",
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
    ProductId: "",
    OrderStatus: "",
    IsStaffAccepted: null,
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
          setFormValues({
            OrderId: orderId,
            LpgNo: response.data.lpgNo,
            ClientName: response.data.booking.consumerName,
            ClientContact: response.data.booking.phoneNumber,
            ClientEmail: response.data.booking.emailId,
            StaffId: response.data.staffId,
            BookingId: response.data.booking.bookingId,
            Amount: response.data.booking.price,
            PaymentType: getPaymentMode(response.data.booking.paymentType),
            PaymentStatus: getPaymentStatus(
              response.data.booking.paymentStatus
            ),
            CreatedBy: response.data.booking.createdBy,
            Address: response.data.booking.shippingAddress,
            ProductId: response.data.booking.productID,
            OrderStatus: getStatusString(response.data.orderStatus),
            IsStaffAccepted: response.data.isStaffAccepted,
          });
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [orderId, token]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: name === "IsStaffAccepted" ? value === "true" :  value === "false" ? false : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formValues.IsStaffAccepted) {
      formValues.OrderStatus = "Confirmed";
    }
    if (!formValues.IsStaffAccepted) {
      formValues.OrderStatus = "StaffRejected";
    }

    try {
      const response = await axios.put(
        `http://localhost:5057/api/Orders/${orderId}`,
        formValues,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Order updated successfully:", response.data);
      router.push("/staff/orders");
    } catch (error) {
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

  const getStatusString = (value: number): string => {
    switch (value) {
      case 0:
        return "Placed";
      case 1:
        return "Confirmed";
      case 2:
        return "OnTheWay";
      case 3:
        return "Delivered";
      case 4:
        return "Staff Rejected";
      case 5:
          return "Rejected";
      default:
        return "";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 px-5 py-8">
      <div className="flex items-center">
        <label className="w-1/4 text-gray-700" htmlFor="name">
          Lpg No
        </label>
        <input
          className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={formValues.LpgNo}
          disabled
        />
      </div>
      <div className="flex items-center">
        <label className="w-1/4 text-gray-700" htmlFor="name">
          Client Name
        </label>
        <input
          className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={formValues.ClientName}
          disabled
        />
      </div>
      <div className="flex items-center">
        <label className="w-1/4 text-gray-700" htmlFor="name">
          Client No
        </label>
        <input
          className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={formValues.ClientContact}
          disabled
        />
      </div>
      <div className="flex items-center">
        <label className="w-1/4 text-gray-700" htmlFor="name">
          Address
        </label>
        <input
          className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={formValues.Address}
          disabled
        />
      </div>
      <div className="flex items-center">
        <label className="w-1/4 text-gray-700" htmlFor="IsStaffAccepted">
          Order Action
        </label>
        <select
          className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="IsStaffAccepted"
          name="IsStaffAccepted"
          onChange={handleChange}
        >
          <option value="">--SELECT--</option>
          <option value="true">Accepted</option>
          <option value="false">Rejected</option>
        </select>
      </div>

      <div className="flex items-center justify-center">
        <button
          type="submit"
          name="create"
          id="createProductBtn"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default StaffAction;
