"use client";
import { format } from 'date-fns';
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Staff, deleteStaff, fetchStaffs } from "@/store/staffSlice";
import Cookies from "js-cookie";

const ViewStaff = () => {
  const dispatch = useDispatch<any>();

  const staffs: Staff[] = useSelector(
    (state: any) => state.staff.staffs
  );

  const token = Cookies.get("token");

  useEffect(() => {
    return () => dispatch(fetchStaffs());
  }, [dispatch, token]);

  const handleDeleteStaff = (staffId: string) => {
    if (window.confirm("Are you sure to delete this category?")) {
      dispatch(deleteStaff(staffId));
    }
  };

  const getStatusString = (status: number) => {
    switch (status) {
      case 0:
        return "Available";
      case 1:
        return "NotAvailable";
      default:
        return "";
    }
  };

  const getStatusClass = (status: number) => {
    switch (status) {
      case 0:
        return "bg-green-500"; // Available status
      case 1:
        return "bg-red-500"; // Not Available status
      default:
        return ""; // Default background color
    }
  };

  return (
    <AdminSidebar>
      <div className="page-wrapper">
        <div className="flex justify-between top-0 bg-white p-3 h-10 mb-10 sm:h-auto w-auto text-sm">
          <h3 className="text-xl text-blue-800 font-semibold text-primary">
            View Staff
          </h3>
          <nav className="flex items-center space-x-2">
            <a href="#" className="text-gray-400 hover:text-blue-800">
              Home
            </a>
            <span className="text-gray-400">{`>`}</span>
            <span className="text-gray-600">View Staff</span>
          </nav>
        </div>

        <div className="container m-auto">
          <div className="w-auto">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-15 m-10 w-auto h-auto">
              <div className="mb-20">
                <a href="#">
                  <button className="bg-purple-900 hover:bg-purple-950 text-white py-2 px-4 rounded focus:outline-none focus:shadow-blue-700">
                    Add Staff
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
                        Staff Name
                      </th>
                      <th className="p-3 border border-b border-gray-300 text-gray-700">
                        Phone No.
                      </th>
                      <th className="p-3 border border-b border-gray-300 text-gray-700">
                        Gender
                      </th>
                      <th className="p-3 border border-b border-gray-300 text-gray-700">
                        Address
                      </th>
                      <th className="p-3 border border-b border-gray-300 text-gray-700">
                        ID Proof Number
                      </th>
                      <th className="p-3 border border-b border-gray-300 text-gray-700">
                        Joining Date
                      </th>
                      <th className="p-3 border border-b border-gray-300 text-gray-700">
                        Status
                      </th>
                      <th className="p-3 border border-b border-gray-300 text-gray-700">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {staffs.map((staff: any, index) => (
                      <tr
                        key={staff.staffId}
                        className="border-b border border-gray-300 bg-gray-100"
                      >
                        <td className="p-3 border border-b border-gray-300">
                          {index + 1}
                        </td>
                        <td className="p-3 border border-b border-gray-300">
                          {staff.staffName}
                        </td>
                        <td className="p-3 border border-b border-gray-300">
                          {staff.phoneNumber}
                        </td>
                        <td className="p-3 border border-b border-gray-300">
                          {staff.gender}
                        </td>
                        <td className="p-3 border border-b border-gray-300">
                          {staff.address}
                        </td>
                        <td className="p-3 border border-b border-gray-300">
                          {staff.aadharCardNo}
                        </td>
                        <td className="p-3  border border-b border-gray-300">
                        {format(new Date(staff.joiningDate), 'dd-MM-yyyy')}
                        </td>
                        <td className="p-3  border  border-gray-300">
                        <span className={`rounded text-white px-2 py-1 ${getStatusClass(staff.status)}`}>
                            {getStatusString(staff.status)}
                          </span>
                        </td>
                        <td className="p-3 border-gray-300 flex justify-end">
                          <div className="m-1">
                            <Link
                              href={`/admin/DeliveryStaff/${staff.staffId}`}
                              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-2 rounded flex items-center"
                            >
                              <FaEdit />
                            </Link>
                          </div>
                          <div className="m-1">
                            <button
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded flex items-center"
                             onClick={()=>handleDeleteStaff(staff.staffId)}
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

export default ViewStaff;
