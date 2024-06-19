'use client';
import AdminSidebar from '@/components/Sidebar/AdminSidebar';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { ToastError, ToastSuccess } from '@/components/ToastError';
import { addStaff } from '@/store/staffSlice';
import { isValidEmail } from '@/components/Enums/EnumConverter';
import { ToastContainer } from 'react-toastify';

const AddStaff = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [aadharNo, setAadharNo] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [phoneNo, setPhoneNo] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [joinDate, setJoinDate] = useState<string>('');
  const [errors, setErrors] = useState<any>({});
  const router = useRouter();
  const dispatch = useDispatch<any>();

  const validateInputs = () => {
    let errors: any = {};

    if (!name) {
      errors.name = "Name is required";
    }

    if (!email || !isValidEmail(email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!gender) {
      errors.gender = "Gender is required";
    }

    if (!aadharNo || aadharNo.length !== 12) {
      errors.aadharNo = "Aadhar card number must be 12 digits.";
    }

    if (!phoneNo || phoneNo.length !== 10) {
      errors.phoneNo = "Mobile number must be 10 digits.";
    }

    if (!address) {
      errors.address = "Address is required";
    }

    if (!joinDate) {
      errors.joinDate = "Joining date is required";
    }

    if (!status) {
      errors.status = "Status is required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    const token = Cookies.get('token');
    if (!token) {
      setErrors({ ...errors, token: 'JWT token not found' });
      return;
    }

    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const userName = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];

    const data: any = {
      StaffName: name,
      EmailId: email,
      Gender: gender,
      AadharCardNo: aadharNo,
      PhoneNumber: phoneNo,
      Address: address,
      JoiningDate: joinDate,
      Status: status,
      CreatedBy: userName,
    };

    try {
      const response = await dispatch(addStaff(data));
      if(response.meta.requestStatus == 'fulfilled'){
        ToastSuccess("Staff Added Successfully!!");
        router.push("/admin/staff/manage");
      }
    } catch (error) {
      console.error('Error adding staff:', error);
      ToastError("Staff Not Added Successfully");
    }
  };

  return (
    <>
    <ToastContainer/>
    <div className="page-wrapper">
      <div className="flex justify-between top-0 bg-white p-3 h-10 mb-10 sm:h-auto w-auto text-sm">
        <h3 className="text-xl text-blue-800 font-semibold text-primary">
          Add Staff
        </h3>
        <nav className="flex items-center space-x-2">
          <a href="#" className="text-gray-400 hover:text-blue-800">
            Home
          </a>
          <span className="text-gray-400">{`>`}</span>
          <span className="text-gray-600">Add Staff</span>
        </nav>
      </div>
  
      <div className="container m-auto">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-15 m-10 w-auto h-auto">
            <form className="space-y-4 pb-5" onSubmit={handleSubmit}>
              <div className="flex items-center mb-6">
                <label className="w-1/4 text-gray-700" htmlFor="name">
                  Name<span className="text-red-500">*</span>
                </label>
                <div className="w-3/4 relative">
                  <input
                    className={`w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.name ? "border-red-500" : ""
                    }`}
                    id="name"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && (
                    <p className="absolute text-sm text-red-600">
                      {errors.name}
                    </p>
                  )}
                </div>
              </div>
  
              <div className="flex items-center mb-6">
                <label className="w-1/4 text-gray-700" htmlFor="email">
                  Email Id <span className="text-red-500">*</span>
                </label>
                <div className="w-3/4 relative">
                  <input
                    className={`w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.email ? "border-red-500" : ""
                    }`}
                    id="email"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <p className="absolute text-sm text-red-600">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>
  
              <div className="flex items-center mb-6">
                <label className="w-1/4 text-gray-700" htmlFor="gender">
                  Gender <span className="text-red-500">*</span>
                </label>
                <div className="w-3/4 relative">
                  <select
                    className={`w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.gender ? "border-red-500" : ""
                    }`}
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">----SELECT----</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {errors.gender && (
                    <p className="absolute text-sm text-red-600">
                      {errors.gender}
                    </p>
                  )}
                </div>
              </div>
  
              <div className="flex items-center mb-6">
                <label className="w-1/4 text-gray-700" htmlFor="mob_no">
                  Mobile No <span className="text-red-500">*</span>
                </label>
                <div className="w-3/4 relative">
                  <input
                    className={`w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.phoneNo ? "border-red-500" : ""
                    }`}
                    id="mob_no"
                    type="text"
                    placeholder="Mobile No"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                  />
                  {errors.phoneNo && (
                    <p className="absolute text-sm text-red-600">
                      {errors.phoneNo}
                    </p>
                  )}
                </div>
              </div>
  
              <div className="flex items-center mb-6">
                <label className="w-1/4 text-gray-700" htmlFor="AadharCardNo">
                  Aadhar Card Number <span className="text-red-500">*</span>
                </label>
                <div className="w-3/4 relative">
                  <input
                    className={`w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.aadharNo ? "border-red-500" : ""
                    }`}
                    id="AadharCardNo"
                    type="text"
                    placeholder="Aadhar Card Number"
                    value={aadharNo}
                    onChange={(e) => setAadharNo(e.target.value)}
                  />
                  {errors.aadharNo && (
                    <p className="absolute text-sm text-red-600">
                      {errors.aadharNo}
                    </p>
                  )}
                </div>
              </div>
  
              <div className="flex items-center mb-6">
                <label className="w-1/4 text-gray-700" htmlFor="joinDate">
                  Joining Date <span className="text-red-500">*</span>
                </label>
                <div className="w-3/4 relative">
                  <input
                    className={`w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.joinDate ? "border-red-500" : ""
                    }`}
                    id="joinDate"
                    type="date"
                    value={joinDate}
                    onChange={(e) => setJoinDate(e.target.value)}
                  />
                  {errors.joinDate && (
                    <p className="absolute text-sm text-red-600">
                      {errors.joinDate}
                    </p>
                  )}
                </div>
              </div>
  
              <div className="flex items-center mb-6">
                <label className="w-1/4 text-gray-700" htmlFor="address">
                  Address <span className="text-red-500">*</span>
                </label>
                <div className="w-3/4 relative">
                  <textarea
                    className={`w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.address ? "border-red-500" : ""
                    }`}
                    id="address"
                    placeholder="Address"
                    style={{ height: "100px" }}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  ></textarea>
                  {errors.address && (
                    <p className="absolute text-sm text-red-600">
                      {errors.address}
                    </p>
                  )}
                </div>
              </div>
  
              <div className="flex items-center mb-6">
                <label className="w-1/4 text-gray-700" htmlFor="status">
                  Status <span className="text-red-500">*</span>
                </label>
                <div className="w-3/4 relative">
                  <select
                    className={`w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.status ? "border-red-500" : ""
                    }`}
                    id="status"
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="">--SELECT--</option>
                    <option value="Available">Available</option>
                    <option value="NotAvailable">Not Available</option>
                  </select>
                  {errors.status && (
                    <p className="absolute text-sm text-red-600">
                      {errors.status}
                    </p>
                  )}
                </div>
              </div>
  
              <div className="flex items-center justify-center">
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

export default AddStaff;
