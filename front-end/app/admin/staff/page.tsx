'use client';
import AdminSidebar from '@/components/Sidebar/AdminSidebar';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { ToastError, ToastSuccess } from '@/components/ToastError';
import { addStaff } from '@/store/staffSlice';

const AddStaff = () => {
  const [name,setName]=useState<string>();
  const [email,setEmail]=useState<string>();
  const [gender,setGender]=useState<string>();
  const [aadharNo,setAadharNo]=useState<string>();
  const [address,setAddress]=useState<string>();
  const [phoneNo,setPhoneNo]=useState<string>();
  const [status,setStatus]=useState<string>();
  const [joinDate,setJoinDate] = useState<string>();
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

      const data: any = {
        StaffName: name,
        EmailId:email,
        Gender: gender,
        AadharCardNo: aadharNo,
        PhoneNumber: phoneNo,
        Address : address,
        JoiningDate: joinDate,
        Status: status,
        CreatedBy: userName,
      };

      try {
          const response = await dispatch(addStaff(data));
          console.log('Category created successfully:', response.payload);
          ToastSuccess("Category Added Successfully!!")
          router.push("/admin/staff/manage");
      } catch (error) {
          console.error('Error creating brand:', error);
          ToastError("Category Not Added Successfully")
      }
  };

    return (
      <>
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
                  <div className="flex items-center">
                    <label className="w-1/4 text-gray-700" htmlFor="name">
                      Name
                    </label>
                    <input
                      className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e)=>{setName(e.target.value)}}
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/4 text-gray-700" htmlFor="name">
                      Email Id
                    </label>
                    <input
                      className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="email"
                      type="text"
                      placeholder="email"
                      value={email}
                      onChange={(e)=>{setEmail(e.target.value)}}
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/4 text-gray-700" htmlFor="gender">
                      Gender
                    </label>
                    <select
                      className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="gender"
                      value={gender}
                      onChange={(e)=>{setGender(e.target.value)}}
                    >
                      <option >----SELECT----</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
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
                      value={phoneNo}
                      onChange={(e)=>{setPhoneNo(e.target.value)}}
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/4 text-gray-700" htmlFor="AadharCardNo">
                      Aadhar Card Number
                    </label>
                    <input
                      className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="AadharCardNo"
                      type="text"
                      placeholder="ID Proof Number"
                      value={aadharNo}
                      onChange={(e)=>{setAadharNo(e.target.value)}}
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/4 text-gray-700" htmlFor="AadharCardNo">
                      Joining Date
                    </label>
                    <input
                      className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="AadharCardNo"
                      type="date"
                      value={joinDate}
                      onChange={(e)=>{setJoinDate(e.target.value)}}
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
                      style={{ height: "100px" }}
                      value={address}
                      onChange={(e)=>{setAddress(e.target.value)}}
                    ></textarea>
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/4 text-gray-700" htmlFor="status">
                      Status
                    </label>
                    <select
                      className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="status"
                      name="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="">--SELECT--</option>
                      <option value="Available">Available</option>
                      <option value="NotAvailable">Not Available</option>
                    </select>
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
