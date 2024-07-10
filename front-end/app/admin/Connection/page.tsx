"use client";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";
import { getSubsidyStatus } from "@/components/Enums/EnumConverter";
import {
  deleteConnection,
  fetchConnections,
  setPage,
  setPageSize,
} from "@/store/connectionSlice";
import { AppDispatch } from "@/store";
import debounce from "lodash.debounce";
import { TbDeviceTabletCog } from "react-icons/tb";

const NewConnection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { connections, page, pageSize, totalCount } = useSelector(
    (state: any) => state.connection
  );
  const [search, setSearch] = useState("");

  const fetchData = useCallback(
    debounce(
      (status: string, page: number, pageSize: number, search: string) => {
        dispatch(fetchConnections({ status, page, pageSize, search }));
      },
      1500
    ),
    [dispatch]
  );

  useEffect(() => {
    fetchData("New", page, pageSize, search);
  }, [fetchData, page, pageSize, search]);

  const totalPages = Math.ceil(totalCount / pageSize);

  const handleDeleteConnection = (lpgNo: string) => {
    if (window.confirm("Are you sure to Delete this Connection?")) {
      dispatch(deleteConnection(lpgNo))
        .then(() => {
          console.log("Connection accepted successfully.");
        })
        .catch((error: any) => {
          console.error("Error accepting order:", error);
        });
    }
  };

  return (
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

      <div className="container m-auto">
        <div className="w-auto">
          <div className="bg-white shadow-md rounded px-8 pt-14 pb-15 m-10 w-auto h-auto">
            <div className="flex justify-between items-center">
              <div className="dataTables_length">
                <label className="mr-3">
                  Show{" "}
                  <select
                    value={pageSize}
                    onChange={(e) => {
                      dispatch(setPageSize(parseInt(e.target.value)));
                    }}
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
                    placeholder="Enter Ration Card No."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border-b-2 border-gray-500 focus:border-blue-700 shadow-md"
                  />
                </label>
              </div>
            </div>

            <div className="table-responsive justify-between mt-3">
              <div className="overflow-x-auto">
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
                    {connections?.map((consumer: any, index: any) => (
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
                        <td className="p-3 border border-b border-gray-300">
                          {consumer.product.productName}{" "}
                          {consumer.product.brand.brandName}
                        </td>
                        <td className="p-3 border-gray-300 flex justify-end">
                          <div className="m-1">
                            <Link
                              href={`/admin/connection/${consumer.lpgNo}`}
                              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-2 rounded flex items-center"
                            >
                              <FaEdit />
                            </Link>
                          </div>
                          <div className="m-1">
                            <button
                              onClick={()=>{handleDeleteConnection(consumer.lpgNo)}}
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded flex items-center"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  Showing {page} of {totalPages} Entries
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewConnection;
