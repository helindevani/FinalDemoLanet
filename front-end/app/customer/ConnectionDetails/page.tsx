"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "@/components/Sidebar";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import {
  getConnectionStatus,
  getSubsidyStatus,
} from "@/components/Enums/EnumConverter";

const ConnectionDetails: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [data, setData] = useState<any>();
  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      const response = axios
        .get(`http://localhost:5057/api/Bookings/Details`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => setData(response.data))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [token]);

  console.log(data?.approvedConnection[0].status)

  // console.log(userId);

  // useEffect(() => {
  //  
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:5057/api/User/AppliedNewConnection`
  //       );

  //       if (response.data.status == "Pending") {
  //         const confirmed = window.confirm(`Your LPG No Is ${response.data.lpgNo} In Pending State!!` );
  //         if (confirmed) {
  //           router.push("/customer/Dashboard");
  //         }
  //       }
  //       if (response.data.status == "Rejected") {
  //         const confirmed = window.confirm(`Your LPG No Is ${response.data.lpgNo} In Rejected State Please Applied New Connection!!` );
  //         if (confirmed) {
  //           router.push("/customer/NewConnection");
  //         }
  //       }
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [ router]);

  return (
    <Sidebar>
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
        <div className="container m-auto h-screen">
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
                          value={data ? data.approvedConnection[0].lpgNo : ""}
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
                          value={data ? data.approvedConnection[0].firstName : ""}
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
                          value={data ? data.approvedConnection[0].lastName : ""}
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
                          value={
                            data ? data.approvedConnection[0].rationCardNumber : ""
                          }
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
                        value={data ? data.approvedConnection[0].address : ""}
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
                            data
                              ? getSubsidyStatus(
                                  data.approvedConnection[0].isGovScheme
                                )
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
                        Aadhar Card No
                      </label>
                      <div className="mt-2.5">
                        <input
                          type="text"
                          name="AadharCardNumber"
                          id="AadharCardNumber"
                          value={
                            data ? data.approvedConnection[0].aadharCardNumber : ""
                          }
                          className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          disabled
                        />
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
                          value={data ? data.approvedConnection[0].poaName : ""}
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
                          value={data ? data.approvedConnection[0].poaNo : ""}
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
                          value={data ? data.approvedConnection[0].poiName : ""}
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
                          value={data ? data.approvedConnection[0].poiNo : ""}
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
                        <input
                          type="text"
                          name="Status"
                          id="Status"
                          value={
                            data
                              ? getConnectionStatus(
                                  data.approvedConnection[0].status
                                )
                              : ""
                          }
                          className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          disabled
                        />
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
                            data
                              ? data.approvedConnection[0].product.productName +
                                "-" +
                                data.approvedConnection[0].product.brand.brandName
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
                          value={data ? data.approvedConnection[0].emailId : ""}
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
                          value={
                            data ? data.approvedConnection[0].phoneNumber : ""
                          }
                          className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default ConnectionDetails;
