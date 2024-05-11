'use client';

import Sidebar from "@/components/Sidebar";
import Cookies from "js-cookie";
import axios from "axios";
import { ToastError, ToastSuccess } from "@/components/ToastError";
import { ToastContainer } from "react-toastify";
import { useState } from "react";

export default function LinkConnection() {
  const [connectionNo, setConnectionNo] = useState<string>();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const token = Cookies.get("token");

    if (!token) {
      console.error("JWT token not found");
      return;
    }

    const decodedToken = JSON.parse(atob(token.split(".")[1]));

    const userId = decodedToken ? decodedToken.sub : null;
    const data = { LpgNo: connectionNo };

    const response = await axios.post(
      `http://localhost:5057/api/User/LinkConnection/${userId}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    if (response.statusText == "User Was Linked Successfully On His Account") {
      ToastSuccess("Your Account Will Be Linked Successfully");
    }
    if (response.statusText == "User Was Already Linked Account With System") {
      ToastError("You Have Already Linked Your Account");
    }
    if (response.statusText == "User Was Not Linked With System") {
      ToastError("Please Provide Valid Data!!");
    }

    console.log("Form submitted successfully");
  };
  return (
    <Sidebar>
      <ToastContainer />
      <div className="page-wrapper">
      <div className="sticky flex justify-between top-0 bg-white p-3 h-10 mb-10 sm:h-auto w-auto text-sm z-30 border-b">
            <h3 className="text-xl text-blue-800 font-semibold text-primary">
              Link Connection Details
            </h3>
            <nav className="flex items-center space-x-2">
              <a href="#" className="text-gray-400 hover:text-blue-800">
                Home
              </a>
              <span className="text-gray-400">{`>`}</span>
              <span className="text-gray-600">Link Connection</span>
            </nav>
          </div>

        <div className="container m-auto">
          <div className="max-w-4xl mx-auto h-screen">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-15 m-10 w-3/4 h-auto">
              <form className="space-y-4 px-5 py-8" onSubmit={handleSubmit}>
                <div className="flex items-center">
                  <label className="w-1/3 text-gray-700" htmlFor="LpgNo">
                    LPG Connection Number
                  </label>
                  <input
                    className="w-2/3 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="LpgNo"
                    name="LpgNo"
                    type="text"
                    value={connectionNo}
                    onChange={(e) => setConnectionNo(e.target.value)}
                    placeholder="Please Enter Your 17 Digit LPG Number"
                    required
                  />
                </div>
                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    name="LinkConnection"
                    id="LinkConnection"
                    className="bg-blue-800 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
