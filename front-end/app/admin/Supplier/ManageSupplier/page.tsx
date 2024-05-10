'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminSidebar from '@/components/AdminSidebar';
import Cookies from 'js-cookie';
import { fetchBrands, deleteBrand, Brand } from '@/store/supplierSlice';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import { ToastError, ToastSuccess } from '@/components/ToastError';
import Link from 'next/link';

const ViewSupplier = () => {
  const dispatch = useDispatch<any>();

  // Fetch categories from Redux store
  const brands:Brand[] = useSelector((state : any) => state.brand.brands);

  // Fetch token from cookies
  const token = Cookies.get('token');

  // Fetch categories when component mounts or token changes
  useEffect(() => {
      return ()=> dispatch(fetchBrands()); // Dispatch fetchCategories action
  }, [dispatch, token]); // Depend on dispatch and token

  // Function to handle category deletion
  const handleDeleteCategory = (brandId: string) => {
    if (window.confirm("Are you sure to delete this category?")) {
      try {
        dispatch(deleteBrand(brandId));
        ToastSuccess("Brand Deleted Successfully!!");
      } catch (error) {
        console.error("Error creating brand:", error);
        ToastError("Brand Not Deleted!!");
      }
    }
  };

  const getStatusString = (status : number) => {
    switch (status) {
      case 0:
        return 'Available';
      case 1:
        return 'NotAvailable';
      default:
        return '';
    }
  };

  return (
    <AdminSidebar>
      <ToastContainer/>
      <div className="page-wrapper">
        <div className="flex flex-col sm:flex-row justify-between top-0 bg-white p-3 h-10 mb-10 sm:h-auto w-auto text-sm">
          <h3 className="text-xl text-blue-800 font-semibold text-primary mb-4 sm:mb-0">
            View Supplier
          </h3>
          <nav className="flex items-center space-x-2">
            <a href="#" className="text-gray-400 hover:text-blue-800">
              Home
            </a>
            <span className="text-gray-400">{`>`}</span>
            <span className="text-gray-600">View Supplier</span>
          </nav>
        </div>

        <div className="container m-auto">
          <div className="w-auto">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-15 m-10 w-auto h-auto">
              <div className="mb-20">
                <a href="/admin/Supplier">
                  <button className="bg-purple-900 hover:bg-purple-950 text-white py-2 px-4 rounded focus:outline-none focus:shadow-blue-700">
                    Add Supplier
                  </button>
                </a>
              </div>

              <div className="flex justify-between items-center">
                <div className="dataTables_length">
                  <label className="mr-3">
                    Show{' '}
                    <select
                      name="myTable_length"
                      aria-controls="myTable"
                      className="form-select border-b-2 border-gray-500 focus:border-blue-700 shadow-md"
                    >
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>{' '}
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
                        Supplier Name
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
                    {brands.map((brand: any, index :any) => (
                      <tr
                         key={brand.brandId}
                        className={`${index % 2 === 0 ? 'bg-gray-300' : 'bg-white'}border-b border border-gray-300 bg-gray-100`}
                      >
                        <td className="p-3 border border-b border-gray-300">
                          {index + 1}
                        </td>
                        <td className="p-3 border border-b border-gray-300">
                          {brand.brandName}
                        </td>
                        <td className="p-3 border border-b border-gray-300">
                          <span className="rounded bg-green-500 text-white px-2 py-1">
                            {getStatusString(brand.brandStatus)}
                          </span>
                        </td>
                        
                        <td className="p-3 border-gray-300 flex justify-end">
                          <div className="m-1">
                            <Link href={`/admin/Supplier/${brand.brandId}`} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-2 rounded flex items-center">
                              <FaEdit /> 
                            </Link>
                          </div>
                          <div className="m-1">
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded flex items-center"
                            onClick={()=>handleDeleteCategory(brand.brandId)}>
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

export default ViewSupplier;

