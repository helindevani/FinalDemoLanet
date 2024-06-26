'use client';
import AdminSidebar from '@/components/Sidebar/AdminSidebar';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { addCategory } from '@/store/categorySlice';
import { ToastError, ToastSuccess } from '@/components/ToastError';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';

const AddCategories = () => {
  const [categoryName, setCategoryName] = useState<string>('');
  const [categoryStatus, setCategoryStatus] = useState<string>('');
  const [error, setError] = useState<any>('');
  const router = useRouter();

  const dispatch = useDispatch<any>();

  const handleSubmit = async (e: any) => {
      e.preventDefault();
      const token = Cookies.get('token');

      if (!token) {
          setError('JWT token not found');
          return;
      }

      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const userName = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];

      const data : any = { CategoryName: categoryName, CategoryStatus: categoryStatus, CreatedBy: userName };

      try {
          const response = await dispatch(addCategory(data));
          console.log('Category created successfully:', response.payload);
          ToastSuccess("Category Added Successfully!!")
          router.push("/admin/categories/manage");
      } catch (error) {
          console.error('Error creating brand:', error);
          ToastError("Category Not Added Successfully")
      }
  };
    return (
      <>
      <ToastContainer />
        <div className="page-wrapper">
          <div className="flex justify-between top-0 bg-white p-3 h-10 mb-10 sm:h-auto w-auto text-sm">
            <h3 className="text-xl text-blue-800 font-semibold text-primary">
              Add Categories Management
            </h3>
            <nav className="flex items-center space-x-2">
              <a href="#" className="text-gray-400 hover:text-blue-800">
                Home
              </a>
              <span className="text-gray-400">{`>`}</span>
              <span className="text-gray-600">Add Categories</span>
            </nav>
          </div>

          <div className="container m-auto">
            <div className="max-w-4xl mx-auto h-screen">
              <div className="bg-white shadow-md rounded px-8 pt-6 pb-15 m-10 w-3/4 h-1/2">
                <form className="space-y-4 px-5 py-8" onSubmit={handleSubmit}>
                  <div className="flex items-center">
                    <label className="w-1/4 text-gray-700" htmlFor="name">
                      Categories Name
                    </label>
                    <input
                      className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      type="text"
                      placeholder="Category Name"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/4 text-gray-700" htmlFor="status">
                      Status
                    </label>
                    <select
                      className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="status"
                      name="status"
                      value={categoryStatus}
                      onChange={(e) => setCategoryStatus(e.target.value)}
                    >
                      <option value="">--SELECT--</option>
                      <option value="Available">Available</option>
                      <option value="NotAvailable">Not Available</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-start">
                    <button
                      type="submit"
                      name="create"
                      id="createProductBtn"
                      className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
        

    );
};

export default AddCategories;
