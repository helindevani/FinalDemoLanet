import AdminSidebar from '@/components/AdminSidebar';
import React from 'react';

const AddConsumer = () => {
    return (
      <AdminSidebar>
        <div className="page-wrapper">
          <div className="flex justify-between top-0 bg-white p-3 h-10 mb-10 sm:h-auto w-auto text-sm">
            <h3 className="text-xl text-blue-800 font-semibold text-primary">
              Add Consumer
            </h3>
            <nav className="flex items-center space-x-2">
              <a href="#" className="text-gray-400 hover:text-blue-800">
                Home
              </a>
              <span className="text-gray-400">{`>`}</span>
              <span className="text-gray-600">Add Client</span>
            </nav>
          </div>

          <div className="container m-auto">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white shadow-md rounded px-8 pt-6 pb-15 m-10 w-auto h-auto">
                <form className="space-y-4 pb-5">
                  <div className="flex items-center">
                    <label className="w-1/4 text-gray-700" htmlFor="name">
                      Name
                    </label>
                    <input
                      className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      type="text"
                      placeholder="Name"
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/4 text-gray-700" htmlFor="gender">
                      Gender
                    </label>
                    <select
                      className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="gender"
                      name="gender"
                    >
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                    </select>
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/4 text-gray-700" htmlFor="mob_no">
                      Mobile No
                    </label>
                    <input
                      className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="mob_no"
                      type="text"
                      placeholder="Mobile No"
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/4 text-gray-700" htmlFor="reffering">
                      ID Proof Number
                    </label>
                    <input
                      className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="reffering"
                      type="text"
                      placeholder="ID Proof Number"
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/4 text-gray-700" htmlFor="address">
                      Address
                    </label>
                    <textarea
                      className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="address"
                      placeholder="Address"
                      style={{ height: "150px" }}
                    ></textarea>
                  </div>
                  <div className="flex items-center">
                    <label
                      className="w-1/4 text-gray-700"
                      htmlFor="productImage"
                    >
                      Upload Image:
                    </label>
                    <input
                      className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="productImage"
                      type="file"
                    />
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
      </AdminSidebar>
    );
};

export default AddConsumer;
