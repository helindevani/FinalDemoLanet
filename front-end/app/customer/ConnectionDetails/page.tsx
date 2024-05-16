"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "@/components/Sidebar";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const ConnectionDetails: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [apiResponse, setApiResponse] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  // useEffect(() => {
  //   const token = Cookies.get("token");

  //   if (!token) {
  //     console.error("JWT token not found");
  //     return;
  //   }

  //   const decodedToken = JSON.parse(atob(token.split(".")[1]));
  //   const userId = decodedToken ? decodedToken.sub : null;
  //   setUserId(userId);
  // }, []);

  // console.log(userId);

  // useEffect(() => {
  //   if (!userId) return;

  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:5057/api/User/AppliedNewConnection/${userId}`
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
  // }, [userId, router]);

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
