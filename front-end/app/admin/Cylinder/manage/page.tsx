"use client";
import AdminSidebar from "@/components/AdminSidebar";
import { deleteProduct, fetchProducts, setPage, setPageSize, Product } from "@/store/productSlice";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect, useCallback } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Cookies from "js-cookie";
import Image from "next/image";
import { ToastError, ToastSuccess } from "@/components/ToastError";
import { ToastContainer } from "react-toastify";
import Link from "next/link";
import { getStatusString } from "@/components/Enums/EnumConverter";
import debounce from "lodash.debounce";
import { AppDispatch } from "@/store";

const ViewCylinder = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState("");
  const { products, totalCount, page, pageSize } = useSelector(
    (state: any) => state.product
  );

  const token = Cookies.get("token");

  const fetchData = useCallback(
    debounce((page, pageSize,search) => {
      dispatch(fetchProducts({ page, pageSize ,search}));
    }, 1500),
    [dispatch]
  );

  useEffect(() => {
    fetchData(page, pageSize,search);
  }, [dispatch, token, page, pageSize, fetchData,search]);

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm("Are you sure to delete this product?")) {
      try {
        dispatch(deleteProduct(productId));
        ToastSuccess("Product Deleted Successfully!!");
      } catch (error) {
        console.log(error);
        ToastError("Product Not Deleted!!");
      }
    }
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <AdminSidebar>
      <ToastContainer />
      <div className="page-wrapper">
        <div className="flex justify-between top-0 bg-white p-3 h-10 mb-10 sm:h-auto w-auto text-sm">
          <h3 className="text-xl text-blue-800 font-semibold text-primary">
            View Cylinder
          </h3>
          <nav className="flex items-center space-x-2">
            <a href="#" className="text-gray-400 hover:text-blue-800">
              Home
            </a>
            <span className="text-gray-400">{`>`}</span>
            <span className="text-gray-600">View Cylinder</span>
          </nav>
        </div>

        <div className="container m-auto">
          <div className="w-auto">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-15 m-10 w-auto h-auto">
              <div className="mb-20">
                <a href="/admin/cylinder">
                  <button className="bg-purple-900 hover:bg-purple-950 text-white py-2 px-4 rounded focus:outline-none focus:shadow-blue-700">
                    Add Cylinder
                  </button>
                </a>
              </div>

              <div className="flex justify-between items-center">
                <div className="dataTables_length">
                  <label className="mr-3">
                    Show{" "}
                    <select
                      name="myTable_length"
                      value={pageSize}
                      onChange={(e) => dispatch(setPageSize(Number(e.target.value)))}
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
                      className="border-b-2 border-gray-500 focus:border-blue-700 shadow-md"
                      placeholder=""
                      value={search}
                      onChange={(e)=>(setSearch(e.target.value))}
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
                        Cylinder
                      </th>
                      <th className="p-3 border border-b border-gray-300 text-gray-700">
                        Rate
                      </th>
                      <th className="p-3 border border-b border-gray-300 text-gray-700">
                        Quantity
                      </th>
                      <th className="p-3 border border-b border-gray-300 text-gray-700">
                        Supplier
                      </th>
                      <th className="p-3 border border-b border-gray-300 text-gray-700">
                        Category
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
                    {products.map((product: any, index: any) => (
                      <tr
                        key={product.productId}
                        className="border-b border border-gray-300 bg-gray-100"
                      >
                        <td className="p-3 border border-b border-gray-300">
                          {index + 1}
                        </td>
                        <td className="p-3 border border-b border-gray-300">
                          <Image
                            src={product.productImage}
                            alt="Product Image"
                            height={100}
                            width={100}
                          ></Image>
                        </td>
                        <td className="p-3 border border-b border-gray-300">
                          {product.productName}
                        </td>
                        <td className="p-3 border border-b border-gray-300">
                          {product.unitPrice}
                        </td>
                        <td className="p-3 border border-b border-gray-300">
                          {product.quantity}
                        </td>
                        <td className="p-3 border border-b border-gray-300">
                          {product.brand?.brandName}
                        </td>
                        <td className="p-3 border border-b border-gray-300">
                          {product.category?.categoryName}
                        </td>

                        <td className="p-3 border border-b border-gray-300">
                          <span className="rounded bg-green-500 text-white px-2 py-1">
                            {getStatusString(product.status)}
                          </span>
                        </td>
                        <td className="p-3 h-44 flex pt-16 justify-end">
                          <div className="m-1 align-middle">
                            <Link
                              href={`/admin/cylinder/${product.productId}`}
                              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-2 rounded flex items-center"
                            >
                              <FaEdit />
                            </Link>
                          </div>
                          <div className="m-1">
                            <button
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded flex items-center"
                              onClick={() =>
                                handleDeleteProduct(product.productId)
                              }
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
                  <div>
                    Showing {page} of {totalPages} Pages
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
    </AdminSidebar>
  );
};

export default ViewCylinder;
