"use client";
import { convertToLocalDate } from "@/components/Enums/EnumConverter";
import Sidebar from "@/components/Sidebar/Sidebar";
import { AppDispatch, RootState } from "@/store";
import { fetchOrdersAdmin,Order, setPageSize,setPage, fetchOrdersUser } from "@/store/orderSlice";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash.debounce";
import Cookies from "js-cookie";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { ToastError, ToastWarning } from "@/components/ToastError";
import LoadingSpinner from "@/components/Items/Spinner/LoadingSpinner";

const ViewOrders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState("");
  const [loading,setIsLoading]=useState(true);
  const router=useRouter();
const { orders, totalCount, page, pageSize } = useSelector(
  (state: any) => state.order
);

const token = Cookies.get("token");

const fetchData = useCallback(
  debounce((page, pageSize,search) => {
    dispatch(fetchOrdersUser({ page, pageSize,search }));
  }, 1500),
  [dispatch]
);

useEffect(() => {
  const fetchAllData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5057/api/User/AppliedNewConnection`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 204) {
        ToastError(
          "Sorry You have no any Active Connection So First Applied For connection"
        );
        setTimeout(() => {
          router.push("/customer/newConnection");
        }, 3000);
      }
      if (response.data.status == "Pending") {
        ToastWarning(
          `Your LPG No Is ${response.data.lpgNo} In Pending State!!`
        );
        router.push("/customer");
      }
      if (response.data.status == "Success") {
        try {
          const response = await axios.get(
            "http://localhost:5057/api/Connections/checkConnectionLinked",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status === 200 && response.data) {
            fetchData(page, pageSize,search);
            setIsLoading(false);  
          } else {
            ToastWarning("Your Account Was Not Linked So First Link Your Account")
            router.push("/customer/newConnection/linkConnection");
          }
        } catch (error) {
          console.error("Error checking existing connection:", error);
        }
      }
      if (response.data.status == "Rejected") {
        ToastError(
          "Your Connection Request Was Rejected Please Reapply!!"
        );
        router.push("/customer/newConnection");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchAllData();
}, [router, token,dispatch, page, pageSize, fetchData,search]);



const totalPages = Math.ceil(totalCount / pageSize);
  return (
    <>
    <ToastContainer/>
    {loading && <LoadingSpinner/>}
      {!loading && <><div className="sticky flex justify-between top-0 bg-white p-3 h-10 mb-10 sm:h-auto w-auto text-sm z-30 border">
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
                      placeholder=""
                      value={search}
                      onChange={(e)=>(setSearch(e.target.value))}
                    />
                  </label>
                </div>
              </div>


        <ul className="my-3">
        {orders.map((order : Order) => (
            <li key={order.orderId} className="my-1">
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
    </>}
    </>
  );
};

export default ViewOrders;
