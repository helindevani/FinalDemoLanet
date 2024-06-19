"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import AdminSidebar from "@/components/Sidebar/AdminSidebar";
import { getOrderStatus, getPaymentDoneOrNot, getPaymentMode, getPaymentStatus, getPaymentType } from "@/components/Enums/EnumConverter";
import { ToastError, ToastSuccess } from "@/components/ToastError";

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
  const [staffs, setStaffs] = useState<any>();
  const [isStaffAccepted, setIsStaffAccepted] = useState<boolean>(true); 
  const router = useRouter();
  const [data, setData] = useState<any>();
  const token = Cookies.get("token");
  const pathname = usePathname();
  const orderId = pathname.split("/")[3];

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
    IsStaffAccepted: null
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
            OrderId:orderId,
            LpgNo: response.data.lpgNo,
            ClientName: response.data.booking.consumerName,
            ClientContact: response.data.booking.phoneNumber,
            ClientEmail: response.data.booking.emailId,
            StaffId: "", 
            BookingId: response.data.booking.bookingId,
            Amount: response.data.booking.price,
            PaymentType: getPaymentType(response.data.booking.paymentType),
            PaymentStatus: getPaymentDoneOrNot(response.data.booking.paymentStatus),
            CreatedBy: response.data.booking.createdBy,
            Address: response.data.booking.shippingAddress,
            ProductId : response.data.booking.productID,
            OrderStatus :getOrderStatus(response.data.orderStatus),
            IsStaffAccepted : response.data.isStaffAccepted,
          });
          setIsStaffAccepted(response.data.isStaffAccepted);
          axios
            .get(`http://localhost:5057/api/Staffs`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              params: { page:1, pageSize:100 },
            })
            .then((staffResponse) => {
              setStaffs(staffResponse.data.pagedStaffs);
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


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!isStaffAccepted){
        formValues.OrderStatus="Placed";
    }
    if(isStaffAccepted){
      formValues.StaffId=data.staffId;
  }
    try {
        const response = await axios.put(`http://localhost:5057/api/Orders/${orderId}`, formValues, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
       ToastSuccess("Order updated successfully!!")
        router.push("/admin/orders");
    } catch (error) {
      ToastError("Failed to update order!!")
        console.error("Error updating order:", error);
    }
};

  return (
    <>
      <div className="page-wrapper">
        <div className="sticky flex justify-between top-0 bg-white p-3 h-10 mb-10 sm:h-auto w-auto text-sm z-30 border">
          <h3 className="text-xl text-blue-800 font-semibold text-primary">
            Order Details
          </h3>
          <nav className="flex items-center space-x-2">
            <a href="#" className="text-gray-400 hover:text-blue-800">
              Home
            </a>
            <span className="text-gray-400">{`>`}</span>
            <span className="text-gray-600">Order Creation</span>
          </nav>
        </div>
        <div className="container m-auto">
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
                          <input
                            className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="OrderStatus"
                            value={formValues.OrderStatus}
                            disabled
                          />
                           
                        </div>
                      </div>
                      {isStaffAccepted === false && (
                        <div className="pr-4 w-1/2">
                          <label
                            htmlFor="StaffId"
                            className="block text-sm font-semibold leading-6 text-gray-900"
                          >
                            Assign Delivery Staff
                          </label>
                          <div className="mt-2.5">
                            <select
                              className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="StaffId"
                              name="StaffId"
                              value={formValues.StaffId}
                              onChange={handleChange}
                            >
                              <option value="">---SELECT---</option>
                              {staffs?.map((staff : any) => (
                                <option key={staff.staffId} value={staff.staffId}>
                                  {staff.staffName}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      )}
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
                  {isStaffAccepted==false &&  <button
                      type="submit"
                      id="createProductBtn"
                      className="bg-blue-800 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Update Order
                    </button>}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
