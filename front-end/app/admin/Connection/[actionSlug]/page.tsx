"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import {
  getConnectionStatus,
  getSubsidyStatus,
} from "@/components/Enums/EnumConverter";
import { AppDispatch } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchConnectionById, fetchConnections } from "@/store/connectionSlice";
import { ToastError, ToastSuccess } from "@/components/ToastError";
import { ToastContainer } from "react-toastify";

const ConnectionDetails: React.FC = () => {
  const [status, setStatus] = useState<string>();
  const token = Cookies.get("token");
  const pathname = usePathname();
  const lpgNo = pathname.split("/")[3];
  const dispatch = useDispatch<AppDispatch>();
  const [isVerified, setIsVerified] = useState(false);
  const connection: any | undefined = useSelector(
    (state: any) => state.connection.selectedConnection
  );
  const router=useRouter();

  useEffect(() => {
    if (token) {
      dispatch(fetchConnectionById(lpgNo));
    }
  }, [token, lpgNo, dispatch]);

  const handleSubmit = async () => {
    if (!isVerified) {
      ToastError("Please Verified Document!!");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5057/api/Admin/Connection/${lpgNo}?status=${status}`,null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if(response.status==200 && response.data == "This User Is Already Have Connection"){
        ToastError("Failed To Approve Connection User Have Already Connection Exist!!");
      }
      if(response.status==200 && response.data == "Connection status approved successfully."){
        ToastSuccess("Successfully Approved!!");
        setTimeout(() => {
          router.push("/admin/connection");
        },3000);
      }
      if(response.status==200 && response.data == "Connection status rejected due to You Have Already Hold Gas Connection."){
        ToastSuccess("Successfully Rejected!!");
        setTimeout(() => {
          router.push("/admin/connection");
        },3000);
      }
    } catch (error) {
      ToastError("Failed Update!!");
      console.error("Error:", error);
    }
  };

  return (
    <>
    <ToastContainer/>
      <div className="page-wrapper">
        <div className="sticky flex justify-between top-0 bg-white p-3 h-10 mb-10 sm:h-auto w-auto text-sm z-30 border">
          <h3 className="text-xl text-blue-800 font-semibold text-primary">
            Connection Details
          </h3>
          <nav className="flex items-center space-x-2">
            <a href="#" className="text-gray-400 hover:text-blue-800">
              Home
            </a>
            <span className="text-gray-400">{`>`}</span>
            <span className="text-gray-600">Connection Details</span>
          </nav>
        </div>
        <div className="container m-auto h-auto">
          <div className="w-auto">
            <div className="bg-white shadow-md rounded px-8 pt-14 pb-16 m-10 w-auto h-auto">
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
                          value={connection ? connection.lpgNo : ""}
                          className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="pr-4 w-1/2">
                      <label
                        htmlFor="FirstName"
                        className="block text-sm font-semibold leading-6 text-gray-900"
                      >
                        First Name
                      </label>
                      <div className="mt-2.5">
                        <input
                          type="text"
                          name="FirstName"
                          id="FirstName"
                          value={connection ? connection.firstName : ""}
                          className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex ">
                    <div className="pr-4 w-1/2">
                      <label
                        htmlFor="LastName"
                        className="block text-sm font-semibold leading-6 text-gray-900"
                      >
                        Last Name
                      </label>
                      <div className="mt-2.5">
                        <input
                          type="text"
                          name="LastName"
                          id="LastName"
                          value={connection ? connection.lastName : ""}
                          className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="pr-4 w-1/2">
                      <label
                        htmlFor="RationCardNumber"
                        className="block text-sm font-semibold leading-6 text-gray-900"
                      >
                        Ration Card No
                      </label>
                      <div className="mt-2.5">
                        <input
                          type="text"
                          name="RationCardNumber"
                          id="RationCardNumber"
                          value={connection ? connection.rationCardNumber : ""}
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
                        disabled
                        value={connection ? connection.address : ""}
                        className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      ></textarea>
                    </div>
                  </div>
                  <div className="flex ">
                    <div className="pr-4 w-1/2">
                      <label
                        htmlFor="IsGovScheme"
                        className="block text-sm font-semibold leading-6 text-gray-900"
                      >
                        Subsidy Applied
                      </label>
                      <div className="mt-2.5">
                        <input
                          type="text"
                          name="IsGovScheme"
                          id="IsGovScheme"
                          value={
                            connection
                              ? getSubsidyStatus(connection.isGovScheme)
                              : ""
                          }
                          className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="pr-4 w-1/2">
                      <label
                        htmlFor="AadharCardNumber"
                        className="block text-sm font-semibold leading-6 text-gray-900"
                      >
                        Document
                      </label>
                      <div className="mt-2.5">
                        <input
                          type="checkbox"
                          id="verifiedCheckbox"
                          name="verifiedCheckbox"
                          className="ml-2"
                          onChange={(e) => setIsVerified(e.target.checked)}
                        />
                        <label
                          htmlFor="verifiedCheckbox"
                          className="ml-2 text-sm text-gray-900"
                        >
                          Verified
                        </label>
                        <a
                          href={connection ? connection.poa : ""}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-4 text-blue-500 hover:underline"
                        >
                          View
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="flex ">
                    <div className="pr-4 w-1/2">
                      <label
                        htmlFor="POAName"
                        className="block text-sm font-semibold leading-6 text-gray-900"
                      >
                        POA(Proof Of Address) Name
                      </label>
                      <div className="mt-2.5">
                        <input
                          type="text"
                          name="POAName"
                          id="POAName"
                          value={connection ? connection.poaName : ""}
                          className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="pr-4 w-1/2">
                      <label
                        htmlFor="POANo"
                        className="block text-sm font-semibold leading-6 text-gray-900"
                      >
                        POA(Proof Of Address) No
                      </label>
                      <div className="mt-2.5">
                        <input
                          type="text"
                          name="POANo"
                          id="POANo"
                          value={connection ? connection.poaNo : ""}
                          className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex ">
                    <div className="pr-4 w-1/2">
                      <label
                        htmlFor="POIName"
                        className="block text-sm font-semibold leading-6 text-gray-900"
                      >
                        POI(Proof Of Identity) Name
                      </label>
                      <div className="mt-2.5">
                        <input
                          type="text"
                          name="POIName"
                          id="POIName"
                          value={connection ? connection.poiName : ""}
                          className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="pr-4 w-1/2">
                      <label
                        htmlFor="POINo"
                        className="block text-sm font-semibold leading-6 text-gray-900"
                      >
                        POI(Proof Of Identity) No
                      </label>
                      <div className="mt-2.5">
                        <input
                          type="text"
                          name="POINo"
                          id="POINo"
                          value={connection ? connection.poiNo : ""}
                          className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex ">
                    <div className="pr-4 w-1/2">
                      <label
                        htmlFor="Status"
                        className="block text-sm font-semibold leading-6 text-gray-900"
                      >
                        Connection Status
                      </label>
                      <div className="mt-2.5">
                        {connection && connection.status == "0" && (
                          <select
                            className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="Status"
                            value={status}
                            onChange={(e) => {
                              setStatus(e.target.value);
                            }}
                          >
                            <option value="">---SELECT---</option>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        )}
                        {connection && connection.status == "1" && (
                          <input
                            type="text"
                            value={
                              connection
                                ? getConnectionStatus(connection.status)
                                : ""
                            }
                            className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            disabled
                          />
                        )}
                      </div>
                    </div>
                    <div className="pr-4 w-1/2">
                      <label
                        htmlFor="Product"
                        className="block text-sm font-semibold leading-6 text-gray-900"
                      >
                        Product Details
                      </label>
                      <div className="mt-2.5">
                        <input
                          type="text"
                          name="Product"
                          id="Product"
                          className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          value={
                            connection
                              ? connection.product.productName +
                                "-" +
                                connection.product.brand.brandName
                              : ""
                          }
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex ">
                    <div className="pr-4 w-1/2">
                      <label
                        htmlFor="EmailId"
                        className="block text-sm font-semibold leading-6 text-gray-900"
                      >
                        Email Address
                      </label>
                      <div className="mt-2.5">
                        <input
                          type="text"
                          name="EmailId"
                          id="EmailId"
                          value={connection ? connection.emailId : ""}
                          className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="pr-4 w-1/2">
                      <label
                        htmlFor="PhoneNumber"
                        className="block text-sm font-semibold leading-6 text-gray-900"
                      >
                        Phone Number
                      </label>
                      <div className="mt-2.5">
                        <input
                          type="text"
                          name="PhoneNumber"
                          id="PhoneNumber"
                          value={connection ? connection.phoneNumber : ""}
                          className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {connection && connection.status == "0" && (
                  <div className="flex items-center justify-center p-3">
                    <button
                      onClick={handleSubmit}
                      className="bg-blue-800 hover:bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Submit
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConnectionDetails;
