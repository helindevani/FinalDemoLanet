"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCheck, FaEdit, FaTimes } from "react-icons/fa";
import StaffSidebar from "@/components/Sidebar/StaffSidebar";
import { fetchOrdersStaff, Order, staffActionOrder } from "@/store/orderSlice";
import { AppDispatch, RootState } from "@/store";
import Link from "next/link";

const ViewOrders = () => {
  const [orderStatus, setOrderStatus] = useState<{
    [key: string]: boolean | null;
  }>({});
  const dispatch = useDispatch<AppDispatch>();

  const ordersData: Order[] = useSelector(
    (state: RootState) => state.order.orders
  );

  useEffect(() => {
    dispatch(fetchOrdersStaff())
      .then((response: any) => {
        const initialStatus = response.payload.reduce(
          (acc: any, order: Order) => {
            acc[order.orderId] = order.isStaffAccepted;
            return acc;
          },
          {}
        );
        setOrderStatus(initialStatus);
      })
      .catch((error: any) => console.error("Error fetching data:", error));
  }, [dispatch]);

  const handleAcceptOrder = (orderId: string) => {
    if (window.confirm("Are you sure to Accept this Order?")) {
      dispatch(staffActionOrder({ orderId, status: true }))
        .then(() => {
          setOrderStatus((prevState) => ({
            ...prevState,
            [orderId]: true,
          }));
        })
        .catch((error: any) => {
          console.error("Error accepting order:", error);
        });
    }
  };

  const handleRejectOrder = (orderId: string) => {
    if (window.confirm("Are you sure to Reject this Order?")) {
      dispatch(staffActionOrder({ orderId, status: false }))
        .then(() => {
          setOrderStatus((prevState) => ({
            ...prevState,
            [orderId]: false,
          }));
        })
        .catch((error: any) => {
          console.error("Error accepting order:", error);
        });
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
    <StaffSidebar>
      {/* <div className="page-wrapper"> */}
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
            <div className="flex justify-between items-center">
              <div className="dataTables_length">
                <label className="mr-3">
                  Show{" "}
                  <select
                    name="myTable_length"
                    aria-controls="myTable"
                    className="form-select border-b-2 border-gray-500 focus:border-blue-700 shadow-md"
                  >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>{" "}
                  entries
                </label>
              </div>
              <div id="myTable_filter" className="dataTables_filter">
                <label className="flex items-center">
                  <span className="mr-1">Search:</span>
                  <input
                    type="search"
                    className="border-b-2 border-gray-500 focus:border-blue-700 shadow-md"
                    placeholder=""
                    aria-controls="myTable"
                  />
                </label>
              </div>
            </div>

            <div className="table-responsive justify-between mt-3">
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
                    {ordersData?.map((order: any, index: any) => (
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
                            {getStatusString(order.orderStatus)}
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
                <div>Showing 1 Of 1 Entries</div>
                <div className="flex p-3">
                  <div className="flex-1 text-gray-500 border p-2 justify-between items-center w-18 h-10">
                    Previous
                  </div>
                  <div className="flex-1 border text-center text-white p-2 bg-blue-600 justify-between items-center w-20 h-10">
                    1
                  </div>
                  <div className="flex-1 text-gray-500 border p-2 justify-between items-center w-18 h-10">
                    Next
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </StaffSidebar>
  );
};

export default ViewOrders;
