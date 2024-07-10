"use client";
import { format } from 'date-fns';
import { useCallback, useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Staff, deleteStaff, fetchStaffs, setPage, setPageSize } from "@/store/staffSlice";
import Cookies from "js-cookie";
import { getStatusClass, getStatusString } from '@/components/Enums/EnumConverter';
import { AppDispatch, RootState } from '@/store';
import debounce from 'lodash.debounce';

const ViewStaff = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { staffs, totalCount, page, pageSize } = useSelector((state: RootState) => state.staff);
  const [search, setSearch] = useState("");
  const token = Cookies.get("token");

  const fetchData = useCallback(
    debounce((page, pageSize, search) => {
      dispatch(fetchStaffs({ page, pageSize, search }));
    }, 1500),
    [dispatch]
  );
    
 
  useEffect(() => {
    fetchData(page, pageSize, search);
  }, [token, page, pageSize, search,fetchData]);

  const handleDeleteStaff = (staffId: string) => {
    if (window.confirm("Are you sure to delete this staff?")) {
      dispatch(deleteStaff(staffId));
    }
  };

  const totalPages = Math.ceil(totalCount / pageSize);


  return (
    <>
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
              <div className="mb-10">
                <Link href="/admin/staff">
                  <button className="bg-blue-800 hover:bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-blue-700">
                    Add Staff
                  </button>
                </Link>
              </div>

              <div className="flex justify-between items-center">
                <div className="dataTables_length">
                  <label className="mr-3">
                    Show{" "}
                    <select
                      name="myTable_length"
                      value={pageSize}
                      onChange={(e) => dispatch(setPageSize(Number(e.target.value)))}
                      className="form-select border-b-2 border-gray-500 shadow-md"
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
                      placeholder="Enter Staff Name"
                      value={search}
                      onChange={(e)=>(setSearch(e.target.value))}
                    />
                  </label>
                </div>
              </div>

              <div className="table-responsive justify-between mt-3 overflow-x-auto">
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
                    {staffs.map((staff: Staff, index: number) => (
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
                        <td className="p-3 border border-b border-gray-300">
                          {format(new Date(staff.joiningDate), 'dd-MM-yyyy')}
                        </td>
                        <td className="p-3 border border-gray-300">
                          <span className={`rounded text-white px-2 py-1 ${getStatusClass(staff.status)}`}>
                            {getStatusString(staff.status)}
                          </span>
                        </td>
                        <td className="p-3 border-gray-300 flex justify-end">
                          <div className="m-1">
                            <Link
                              href={`/admin/staff/${staff.staffId}`}
                              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-2 rounded flex items-center"
                            >
                              <FaEdit />
                            </Link>
                          </div>
                          <div className="m-1">
                            <button
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded flex items-center"
                              onClick={() => handleDeleteStaff(staff.staffId)}
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
                  <div>Showing {page} of {totalPages} Entries</div>
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
      </div>
    </>
  );
};

export default ViewStaff;
