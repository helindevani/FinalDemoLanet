"use client";
import { useCallback, useEffect , useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {  FaEdit,  FaEye,  FaTrash } from "react-icons/fa";
import { fetchOrdersAdmin,Order, setPageSize,setPage } from "@/store/orderSlice";
import { AppDispatch, RootState } from "@/store";
import AdminSidebar from "@/components/Sidebar/AdminSidebar";
import Link from "next/link";
import { convertToLocalDate, getOrderStatus } from "@/components/Enums/EnumConverter";
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
      dispatch(fetchOrdersAdmin({ page, search,pageSize,history:true }));
    }, 1500),
    [dispatch]
  );

  useEffect(() => {
    fetchData(page, pageSize,search);
  }, [dispatch, token, page, pageSize, fetchData,search]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <>
      {/* <div className="page-wrapper"> */}
        <div className="flex justify-between bg-white p-1 h-10 mb-10 sm:h-auto w-auto text-sm">
          <h3 className="text-xl text-blue-800 font-semibold text-primary">
            Order Details
          </h3>
          <nav className="flex items-center space-x-2">
            <a href="#" className="text-gray-400 hover:text-blue-800">
              Home
            </a>
            <span className="text-gray-400">{`>`}</span>
            <span className="text-gray-600">Order Details</span>
          </nav>
        </div>

        <div className="container m-auto h-screen">
          <div className="w-auto">
            <div className="bg-white shadow-md rounded px-8 pt-14 pb-[15px] m-10 w-auto h-auto ">
              <div className="flex justify-between items-center pb-2">
                <div className="dataTables_length">
                  <label className="mr-3">
                    Show{" "}
                    <select
                      name="myTable_length"
                      value={pageSize}
                      onChange={(e) => dispatch(setPageSize(Number(e.target.value)))}
                      className="form-select border-b-2 border-gray-500 focus:border-blue-700 shadow-md"
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
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
                      placeholder="Enter Lpg No"
                      value={search}
                      onChange={(e)=>(setSearch(e.target.value))}
                    />
                  </label>
                </div>
          
              </div>

              <div className="table-responsive justify-between mt-3">
                <div className="overflow-x-auto pb-2">
                <table className="w-full border border-gray-300">
                  <thead className="bg-white">
                    <tr>
                      <th className="p-1 border border-b border-gray-300 text-gray-700">
                        #
                      </th>
                      <th className="p-1 border border-b border-gray-300 text-gray-700">
                      LPG No
                      </th>
                      <th className="p-1 border border-b border-gray-300 text-gray-700">
                      Consumer Name
                      </th>
                      <th className="p-1 border border-b border-gray-300 text-gray-700">
                       Consumer Contact
                      </th>
                      <th className="p-1 border border-b border-gray-300 text-gray-700">
                       Booking Date
                      </th>
                      <th className="p-1 border border-b border-gray-300 text-gray-700">
                       Order Date
                      </th>
                      <th className="p-1 border border-b border-gray-300 text-gray-700">
                       Staff Name
                      </th>
                      <th className="p-1 border border-b border-gray-300 text-gray-700">
                       Order Status
                      </th>
                      <th className="p-1 border border-b border-gray-300 text-gray-700">
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
                        <td className="p-1 border border-b border-gray-300 text-center">
                          {index + 1}
                        </td>
                        <td className="p-1 border border-b border-gray-300 text-center">
                          {order.lpgNo}
                        </td>
                        <td className="p-1 border border-b border-gray-300 text-center">
                          {order.clientName}
                        </td>
                        <td className="p-1 border border-b border-gray-300 text-center">
                          {order.clientContact}
                        </td>
                        <td className="p-1 border border-b border-gray-300 text-center">
                          {convertToLocalDate(order.booking.bookingDate)}
                        </td>
                        <td className="p-1 border border-b border-gray-300 text-center">
                        {convertToLocalDate(order.orderDate)}
                        </td>
                        <td className="p-1 border border-b border-gray-300 text-center">
                        {order.staff.staffName}
                        </td>
                        <td className="p-1 border border-b border-gray-300 text-center">
                          <span className="rounded bg-green-500 text-white px-2 py-1">
                            {getOrderStatus(order.orderStatus)}
                          </span>
                        </td>

                        <td className="p-1   border-gray-300 flex justify-end">
                          <div className="m-1">
                            <Link
                              href={`/admin/orders/history/${order.orderId}`}
                              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-2 rounded flex items-center"
                            >
                              <FaEye />
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
      {/* </div> */}
    </>
  );
};

export default ViewOrders;
