"use client";
import { useState, useEffect } from "react";
import AdminSidebar from "@/components/Sidebar/AdminSidebar";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ToastError, ToastSuccess } from "@/components/ToastError";
import { ToastContainer } from "react-toastify";
import { updateStaff } from "@/store/staffSlice";
import { getStatusString } from "@/components/Enums/EnumConverter";

const EditStaff = () => {
  const [name,setName]=useState<string>();
  const [gender,setGender]=useState<string>();
  const [aadharNo,setAadharNo]=useState<string>();
  const [address,setAddress]=useState<string>();
  const [phoneNo,setPhoneNo]=useState<string>();
  const [email,setEmail]=useState<string>();
  const [status,setStatus]=useState<string>();
  const [joinDate,setJoinDate] = useState<string>();
  const [error, setError] = useState<any>("");
  const router = useRouter();
  const pathname = usePathname();
  const staffId = pathname.split("/")[3];
  const dispatch = useDispatch<any>();
  const staff = useSelector((state: any) =>
    state.staff.staffs.find(
      (staff: any) => staff.staffId === staffId
    )
  );

  useEffect(() => {
   
      if (staff) {
        setName(staff.staffName);
        setGender(staff.gender);
        setAadharNo(staff.aadharCardNo);
        setAddress(staff.address);
        setEmail(staff.emailId);
        setPhoneNo(staff.phoneNumber);
        setStatus(getStatusString(staff.status));
        setJoinDate(staff.joiningDate.substring(0, 10));
      }
  }, [staff]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const token = Cookies.get("token");

    if (!token) {
      setError("JWT token not found");
      return;
    }

    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const userName =
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
      ];

      const data: any = {
        StaffId: staffId,
        EmailId:email,
        StaffName: name,
        Gender: gender,
        AadharCardNo: aadharNo,
        PhoneNumber: phoneNo,
        Address : address,
        JoiningDate: joinDate,
        Status: status,
        CreatedBy: userName,
      };

    try {
      const response = await dispatch(updateStaff({ staffId, data }));
      if(response.meta.requestStatus == 'fulfilled'){
        ToastSuccess("Staff Updated Successfully!!");
        router.push("/admin/staff/manage");
      }
    } catch (error) {
      console.error("Error Updating Staff:", error);
      ToastError("Staff Not Updated!!");
    }
  };

  return (
    <>

        <ToastContainer />
        <div className="page-wrapper">
          <div className="flex justify-between top-0 bg-white p-3 h-10 mb-10 sm:h-auto w-auto text-sm">
            <h3 className="text-xl text-blue-800 font-semibold text-primary">
              Edit Staff Details
            </h3>
            <nav className="flex items-center space-x-2">
              <a href="#" className="text-gray-400 hover:text-blue-800">
                Home
              </a>
              <span className="text-gray-400">{`>`}</span>
              <span className="text-gray-600">Edit Staff</span>
            </nav>
          </div>

          <div className="container m-auto">
            <div className="max-w-4xl mx-auto mb-14">
              <div className="bg-white shadow-md rounded px-8 pt-6 pb-10 m-10 h-auto">
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

export default EditStaff;
