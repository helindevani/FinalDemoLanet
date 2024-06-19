"use client";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCheck, FaEdit, FaTimes } from "react-icons/fa";
import StaffSidebar from "@/components/Sidebar/StaffSidebar";
import { fetchOrdersStaff, Order, setPage, setPageSize, staffActionOrder } from "@/store/orderSlice";
import { AppDispatch, RootState } from "@/store";
import Link from "next/link";
import { getOrderStatus, getPaymentMode, getPaymentStatus } from "@/components/Enums/EnumConverter";
import debounce from "lodash.debounce";
import Cookies from "js-cookie";

const ViewOrders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState("");
  const { orders, totalCount, page, pageSize } = useSelector(
    (state: any) => state.order
  );

  const token = Cookies.get("token");

  const fetchData = useCallback(
    debounce((page, pageSize,search) => {
      dispatch(fetchOrdersStaff({ page, pageSize,history:false,search }));
    }, 1500),
    [dispatch]
  );

  useEffect(() => {
    fetchData(page, pageSize,search);
  }, [dispatch, token, page, pageSize, fetchData,search]);

  const totalPages = Math.ceil(totalCount / pageSize);



  return (
    <>
      <div className="page-wrapper">
      <div className="flex justify-between bg-white p-3 h-10 mb-10 sm:h-auto w-auto text-sm">
        <h3 className="text-xl text-blue-800 font-semibold text-primary">
          Assigned Orders
        </h3>
        <nav className="flex items-center space-x-2">
          <a href="#" className="text-gray-400 hover:text-blue-800">
            Home
          </a>
          <span className="text-gray-400">{`>`}</span>
          <span className="text-gray-600">Assigned Orders</span>
        </nav>
      </div>

      <div className="container m-auto h-screen">
        <div className="w-auto">
          <div className="bg-white shadow-md rounded px-8 pt-14 pb-15 m-10 w-auto h-auto ">
          <div className="flex justify-between items-center pb-2">

                <div>
                  <label className="mr-3">
                    Show{" "}
                    <select
                      name="myTable_length"
                      value={pageSize}
                      onChange={(e) => dispatch(setPageSize(Number(e.target.value)))}
                      className="border-b-2 border-gray-500 shadow-md focus:outline-none"
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                    </select>{" "}
                    entries
                  </label>
                </div>
                <div className="flex">

                    <span className="mr-1">Search:</span>
                    <input
                      type="search"
                      className="border-b-2 border-gray-500 shadow-md focus:outline-none"
                      placeholder=""
                      value={search}
                      onChange={(e)=>(setSearch(e.target.value))}
                    />

                </div>
              </div>

            <div className="justify-between mt-3">
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300">
                  <thead className="bg-white">
                    <tr>
                      <th className="p-3 border border-b border-gray-300 text-gray-700">
                        #
                      </th>
                      <th className="p-3 border border-b border-gray-300 text-gray-700">
                        LPG No
                      </th>
                      <th className="p-3 border border-b border-gray-300 text-gray-700">
                        Consumer Name
                      </th>
                      <th className="p-3 border border-b border-gray-300 text-gray-700">
                        Consumer Contact
                      </th>
                      <th className="p-3 border border-b border-gray-300 text-gray-700">
                        Amount
                      </th>
                      <th className="p-3 border border-b border-gray-300 text-gray-700">
                        Payment Mode
                      </th>
                      <th className="p-3 border border-b border-gray-300 text-gray-700">
                        Payment Status
                      </th>
                      <th className="p-3 border border-b border-gray-300 text-gray-700">
                        Order Status
                      </th>
                      <th className="p-3 border border-b border-gray-300 text-gray-700">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders?.map((order: any, index: any) => (
                      <tr
                        key={order.orderId}
                        className="border-b border border-gray-300 bg-gray-100"
                      >
                        <td className="p-3 border border-b border-gray-300">
                          {index + 1}
                        </td>
                        <td className="p-3 border border-b border-gray-300">
                          {order.lpgNo}
                        </td>
                        <td className="p-3 border border-b border-gray-300">
                          {order.clientName}
                        </td>
                        <td className="p-3 border border-b border-gray-300">
                          {order.clientContact}
                        </td>
                        <td className="p-3 border border-b border-gray-300">
                          {order.amount}
                        </td>
                        <td className="p-3 border border-b border-gray-300">
                          <span className="rounded bg-green-500 text-white px-2 py-1">
                            {getPaymentMode(order.paymentType)}
                          </span>
                        </td>
                        <td className="p-3 border border-b border-gray-300">
                          <span className="rounded bg-green-500 text-white px-2 py-1">
                            {getPaymentStatus(order.paymentStatus)}
                          </span>
                        </td>
                        <td className="p-3 border border-b border-gray-300">
                          <span className="rounded bg-green-500 text-white px-2 py-1">
                            {getOrderStatus(order.orderStatus)}
                          </span>
                        </td>

                        <td className="p-3  border-gray-300 flex justify-end">
                          <div className="m-1">
                            <Link
                              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-2 rounded flex items-center"
                              href={`/staff/orders/${order.orderId}`}
                            >
                              <FaEdit />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-between items-center">
                  <div>
                    Showing {page} of {totalPages} Pages
                  </div>
                  <div className="flex p-3">
                    <button
                      className="flex-1 text-gray-500 border p-2 justify-between items-center w-18 h-10"
                      disabled={page <= 1}
                      onClick={() => dispatch(setPage(page - 1))}
                    >
                      Previous
                    </button>
                    <div className="flex-1 border text-center text-white p-2 bg-blue-600 justify-between items-center w-20 h-10">
                      {page}
                    </div>
                    <button
                      className="flex-1 text-gray-500 border p-2 justify-between items-center w-18 h-10"
                      disabled={page >= totalPages}
                      onClick={() => dispatch(setPage(page + 1))}
                    >
                      Next
                    </button>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default ViewOrders;
