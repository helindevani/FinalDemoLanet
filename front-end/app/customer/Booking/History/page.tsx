"use client";
import Sidebar from "@/components/Sidebar";
import { AppDispatch, RootState } from "@/store";
import { Order, fetchOrdersAdmin } from "@/store/orderSlice";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ViewOrders = () => {
const dispatch = useDispatch<AppDispatch>();
const orders : Order[] = useSelector((state: RootState) => state.order.orders);

  useEffect(() => {
    const fetchOrders = async () => {
      dispatch(fetchOrdersAdmin(true));
    };
    fetchOrders();
  }, [dispatch]); 

  function convertToLocalDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0'); 
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear(); 
    return `${day}-${month}-${year}`;
  }


  return (
    <Sidebar>
      <div className="sticky flex justify-between top-0 bg-white p-3 h-10 mb-10 sm:h-auto w-auto text-sm z-30 border">
        <h3 className="sm:text-xl text-blue-800 font-semibold text-primary">
          Order History
        </h3>
        <nav className="flex items-center space-x-2">
          <a href="#" className="text-gray-400 hover:text-blue-800">
            Home
          </a>
          <span className="text-gray-400">{`>`}</span>
          <span className="text-gray-600">Order History</span>
        </nav>
      </div>

      <div className="bg-white shadow-md rounded p-10 m-10 w-auto border-b ">
        <ul>
        {orders.map((order) => (
            <li key={order.orderId}>
              <Link href={`/customer/booking/history/${order.orderId}`}>
              <div className="sm:flex p-2  bg-slate-100 shadow-lg">
          <div className="w-full sm:w-1/6 flex justify-center items-center">
            <Image
              src={order.booking.product.productImage}
              alt="Product Image"
              height={100}
              width={100}
              className="border"
            ></Image>
          </div>
          <div className=" w-full sm:w-3/6 text-xs sm:text-base flex justify-center items-center">
            <div className="w-full p-4">
              <table className="w-full text-left">
                <tbody>
                  <tr>
                    <td className="px-4 py-2">Product Name :</td>
                    <td className="px-4 py-2">{order.booking.product.productName}-{order.booking.product.brand.brandName}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Order Id :</td>
                    <td className="px-4 py-2">{order.orderId}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Booking Id:</td>
                    <td className="px-4 py-2">{order.bookingId}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-full sm:w-2/6 p-4 text-xs sm:text-base justify-center">
              <table className="w-full text-left">
                <tbody>
                  <tr>
                    <td className="px-4 py-2">Booking Date :</td>
                    <td className="px-4 py-2 ">{convertToLocalDate(order.booking.bookingDate)}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Order Date :</td>
                    <td className="px-4 py-2">{convertToLocalDate(order.orderDate)}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Delivery Date:</td>
                    <td className="px-4 py-2">{convertToLocalDate(order.booking.bookingDate)}</td>
                  </tr>
                </tbody>
              </table>
          </div>
        </div>
              </Link>
          
          </li>
        ))}
        </ul>
        
      </div>
    </Sidebar>
  );
};

export default ViewOrders;
