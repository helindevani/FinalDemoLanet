'use client';
import AdminSidebar from '@/components/AdminSidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Link from 'next/link';
import Cookies from 'js-cookie';

const RejectConnection = () => {
  const [consumers, setConsumers] = useState([]);
  const token= Cookies.get('token');

  useEffect(() => {
    const response=axios.get('http://localhost:5057/api/Connections/Reject',{
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => setConsumers(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, [token]);

  const getSubsidyStatus = (value: boolean): string => {
    switch (value) {
        case true:
            return "Yes";
        case false:
            return "No";
        default:
            return "";
    }
};

    return (
      <AdminSidebar>
      <div className="page-wrapper">
        <div className="flex justify-between top-0 bg-white p-3 h-10 mb-10 sm:h-auto w-auto text-sm">
          <h3 className="text-xl text-blue-800 font-semibold text-primary">
            New Connection
          </h3>
          <nav className="flex items-center space-x-2">
            <a href="#" className="text-gray-400 hover:text-blue-800">
              Home
            </a>
            <span className="text-gray-400">{`>`}</span>
            <span className="text-gray-600">NewConnection</span>
          </nav>
        </div>

        <div className="container m-auto h-screen">
          <div className="w-auto">
            <div className="bg-white shadow-md rounded px-8 pt-14 pb-15 m-10 w-auto h-auto">
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
                        LPG No
                      </th>
                      <th className="p-3 border border-b border-gray-300 text-gray-700">
                        Consumer Name
                      </th>
                      <th className="p-3 border border-b border-gray-300 text-gray-700">
                        Subsidy Applied
                      </th>
                      <th className="p-3 border border-b border-gray-300 text-gray-700">
                        Mobile NO
                      </th>
                      <th className="p-3 border border-b border-gray-300 text-gray-700">
                        Ration Card No
                      </th>
                      <th className="p-3 border border-b border-gray-300 text-gray-700">
                        Product Name
                      </th>
                      <th className="p-3 border border-b border-gray-300 text-gray-700">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {consumers.map((consumer: any, index) => ( 
                      <tr
                        key={consumer.lpgNo}
                        className="border-b border border-gray-300 bg-gray-100"
                      >
                        <td className="p-3 border border-b border-gray-300">
                          {index + 1}
                        </td>
                        <td className="p-3 border border-b border-gray-300">
                         {consumer.lpgNo}
                        </td>
                        <td className="p-3 border border-b border-gray-300">
                        {consumer.firstName} {consumer.lastName}
                        </td>
                        <td className="p-3 border border-b border-gray-300">
                          {getSubsidyStatus(consumer.isGovScheme)}
                        </td>
                        <td className="p-3 border border-b border-gray-300">
                          {consumer.phoneNumber}
                        </td>
                        <td className="p-3 border border-b border-gray-300">
                          {consumer.rationCardNumber}
                        </td>
                        <td className="p-3  border border-b border-gray-300">
                          {consumer.product.productName} {consumer.product.brand.brandName}
                        </td>
                        <td className="p-3   border-gray-300 flex justify-end">
                          <div className="m-1">
                            <Link
                              href="#"
                              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-2 rounded flex items-center"
                            >
                              <FaEdit />
                            </Link>
                          </div>
                          <div className="m-1">
                            <button
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded flex items-center"
                              // onClick={() =>
                              //   handleDeleteCategory(category.categoryId)
                              // }
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                     ))}
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
      </div>
    </AdminSidebar>
    );
};

export default RejectConnection;
