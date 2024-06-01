"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import StaffSidebar from "@/components/Sidebar/StaffSidebar";
import OrderDetails from "@/components/Staff/Orderdetails";
import StaffAction from "@/components/Staff/StaffAction";

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

const Order: React.FC = () => {
  const [isStaffAccepted, setIsStaffAccepted] = useState<boolean>(false); 
  const router = useRouter();
  const [data, setData] = useState<any>();
  const token = Cookies.get("token");
  const pathname = usePathname();
  const orderId : any= pathname.split("/")[3];


  useEffect(() => {
    if (token) {
      axios
        .get(`http://localhost:5057/api/Orders/${orderId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response)=>{
          if(response.data.isStaffAccepted){
            setIsStaffAccepted(true);
          }
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [orderId,token]);


  return (
    <>
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

              {isStaffAccepted && <OrderDetails orderId={orderId}/>}
              {!isStaffAccepted && <StaffAction orderId={orderId}/>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
