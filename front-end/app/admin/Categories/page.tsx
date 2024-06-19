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
  const [errors, setErrors] = useState<any>({});
  const router = useRouter();
  const dispatch = useDispatch<any>();

  const validate = () => {
    const errors: any = {};
    if (!categoryName) errors.categoryName = "Category Name is required.";
    if (!categoryStatus) errors.categoryStatus = "Status is required.";
    return errors;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const token = Cookies.get('token');
    if (!token) {
      setErrors({ token: 'JWT token not found' });
      return;
    }

    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const userName = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];

    const data: any = { CategoryName: categoryName, CategoryStatus: categoryStatus, CreatedBy: userName };

    try {
      const response = await dispatch(addCategory(data));
      if (response.meta.requestStatus === 'fulfilled') {
        ToastSuccess("Category Added Successfully!!");
        router.push("/admin/categories/manage");
      }
    } catch (error) {
      console.error('Error creating category:', error);
      ToastError("Category Not Added Successfully");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="page-wrapper">
        <div className="flex justify-between top-0 bg-white p-3 h-10 mb-10 sm:h-auto w-auto text-sm">
          <h3 className="text-xl text-blue-800 font-semibold text-primary">
            Add Categories 
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
                <div className="flex items-center mb-6">
                  <label className="w-1/4 text-gray-700" htmlFor="name">
                    Categories Name <span className='text-red-500'>*</span>
                  </label>
                  <div className="w-3/4 relative">
                    <input
                      className={`w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        errors.categoryName ? 'border-red-500' : ''
                      }`}
                      id="name"
                      type="text"
                      placeholder="Category Name"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                    />
                    {errors.categoryName && (
                      <p className="absolute mt-1 text-sm text-red-600">{errors.categoryName}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center mb-6">
                  <label className="w-1/4 text-gray-700" htmlFor="status">
                    Status <span className='text-red-500'>*</span>
                  </label>
                  <div className="w-3/4 relative">
                    <select
                      className={`w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        errors.categoryStatus ? 'border-red-500' : ''
                      }`}
                      id="status"
                      name="status"
                      value={categoryStatus}
                      onChange={(e) => setCategoryStatus(e.target.value)}
                    >
                      <option value="">--SELECT--</option>
                      <option value="Available">Available</option>
                      <option value="NotAvailable">Not Available</option>
                    </select>
                    {errors.categoryStatus && (
                      <p className="absolute mt-1 text-sm text-red-600">{errors.categoryStatus}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-start">
                  <button
                    type="submit"
                    name="create"
                    id="createProductBtn"
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
    </>
  );
};

export default AddCategories;
