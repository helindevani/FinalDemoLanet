"use client";
import Head from "next/head";
// import Header from './constant/layout/header';
// import Sidebar from './constant/layout/sidebar';
import axios from "axios"; // Import axios for fetching data
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { FaDeleteLeft } from "react-icons/fa6";

const ViewConsumer = () => {
  const [consumers, setConsumers] = useState([]);

  useEffect(() => {
    return ()=>{const fetchConsumerData = async () => {
      try {
        const response = await axios.get("/api/consumers"); // Adjust API endpoint as per your backend
        setConsumers(response.data);
      } catch (error) {
        console.error("Error fetching consumer data:", error);
      }
      
    fetchConsumerData();
    };
  }
  }, []);

  return (
    <AdminSidebar>
      <div className="page-wrapper">
        <div className="flex justify-between top-0 bg-white p-3 h-10 mb-10 sm:h-auto w-auto text-sm">
          <h3 className="text-xl text-blue-800 font-semibold text-primary">
            View Consumer
          </h3>
          <nav className="flex items-center space-x-2">
            <a href="#" className="text-gray-400 hover:text-blue-800">
              Home
            </a>
            <span className="text-gray-400">{`>`}</span>
            <span className="text-gray-600">View Client</span>
          </nav>
        </div>

        <div className="container m-auto">
          <div className="w-auto">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-15 m-10 w-auto h-auto">
              <div className="mb-20">
                <a href="#">
                  <button className="bg-purple-900 hover:bg-purple-950 text-white py-2 px-4 rounded focus:outline-none focus:shadow-blue-700">
                    Add Consumer
                  </button>
                </a>
              </div>

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
                <table className="w-full border border-gray-300">
                  <thead className="bg-white">
                    <tr>
                      <th className="p-3 border border-b border-gray-300 text-gray-700">
                        #
                      </th>
                      <th className="p-3 border border-b border-gray-300 text-gray-700">
                        Photo
                      </th>
                      <th className="p-3 border border-b border-gray-300 text-gray-700">
                        Consumer Name
                      </th>
                      <th className="p-3 border border-b border-gray-300 text-gray-700">
                        Gender
                      </th>
                      <th className="p-3 border border-b border-gray-300 text-gray-700">
                        Mobile NO
                      </th>
                      <th className="p-3 border border-b border-gray-300 text-gray-700">
                        ID Proof Number
                      </th>
                      <th className="p-3 border border-b border-gray-300 text-gray-700">
                        Address
                      </th>
                      <th className="p-3 border border-b border-gray-300 text-gray-700">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {consumers.map((consumer: any, index) => ( */}
                      <tr
                        // key={index}
                        className="border-b border border-gray-300 bg-gray-100"
                      >
                        <td className="p-3 border border-b border-gray-300">
                          1
                        </td>
                        <td className="p-3 border border-b border-gray-300">
                          Image
                        </td>
                        <td className="p-3 border border-b border-gray-300">
                          helin
                        </td>
                        <td className="p-3 border border-b border-gray-300">
                          Male
                        </td>
                        <td className="p-3 border border-b border-gray-300">
                          9157420020
                        </td>
                        <td className="p-3 border border-b border-gray-300">
                          20
                        </td>
                        <td className="p-3  border border-b border-gray-300">
                          Amreli
                        </td>
                        <td className="p-3  border border-b border-gray-300">
                          {/* <a href={`editclient.php?id=${consumer.id}`}> */}
                          <a>
                            <button className="btn btn-primary">Edit</button>
                          </a>
                          <a
                            // href={`php_action/removeclient.php?id=${consumer.id}`}
                            onClick={() =>
                              confirm("Are you sure to delete this record?")
                            }
                          >
                            <FaDeleteLeft className="btn btn-danger ml-2">
                              Delete
                            </FaDeleteLeft>
                          </a>
                        </td>
                      </tr>
                    {/* ))} */}
                  </tbody>
                </table>
                <div className="flex justify-between items-center">
                  <div>Showing 1 Of 1 Entries</div>
                  <div className="flex p-3">
                    <div className="flex-1 text-gray-500 border p-2 justify-between items-center w-18 h-10">Previous</div>
                    <div className="flex-1 border text-center text-white p-2 bg-blue-600 justify-between items-center w-20 h-10">1</div>
                    <div className="flex-1 text-gray-500 border p-2 justify-between items-center w-18 h-10">Next</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        

        {/* <footer className="text-center text-sm text-gray-600 mt-8">
                Author Name- Mayuri K. For any PHP, Codeignitor, Laravel OR Python work contact me at mayuri.infospace@gmail.com Visit website - www.mayurik.com
            </footer> */}
      </div>
    </AdminSidebar>
  );
};

export default ViewConsumer;
