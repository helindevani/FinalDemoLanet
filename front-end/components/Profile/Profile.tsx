"use client";
import React, { useEffect, useState } from "react";
import PB from "../../public/Profilebanner.png";
import Image from "next/image";
import { FaAddressCard, FaEdit } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from "axios";
import { ToastError, ToastSuccess } from "../ToastError";
import { ToastContainer } from "react-toastify";
import { IoLogOut } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import { RootState } from "../TypeInterface/AllType";

const ProfileComponent = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordUpdate, setIsPasswordUpdate] = useState(false);
  const [profileImg, setProfileImage] = useState<string | null>(null);
  const [emailId, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phoneNo, setPhoneNumber] = useState<any>("");
  const [profile, setProfile] = useState<File | null>(null);
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const dispatch = useDispatch();
  const router = useRouter();
  const token: any = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const number: string = token?.token?.phoneNumber;
    const id: string = token?.token?.email;
    const image: string = token?.token?.profileImage;
    const name: string = token?.token?.personName;
    setPhoneNumber(number);
    setProfileImage(image);
    setEmail(id);
    setName(name);
  }, [token.token]);

  console.log(emailId, name, phoneNo, profileImg);

  const handleEditClick = () => {
    setIsEditing(true);
    setIsPasswordUpdate(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);
    await handleSubmit();
  };
  
  const handlePasswordEditClick = () => {
    setIsPasswordUpdate(true);
    setIsEditing(false);
  };

  const handlePasswordCancelClick = () => {
    setIsPasswordUpdate(false);
  };

  const handlePasswordSaveClick =async () => {
    
    await handleChangePassword();
    setIsPasswordUpdate(false);
  };

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      setProfile(file);
    }
  };

  const handleClick = () => {
    dispatch(logout());
    localStorage.removeItem("role");
    router.push("/");
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("Name", name);
      formData.append("Email", emailId);
      formData.append("PhoneNumber", phoneNo);
      if (profile) {
        formData.append("ProfileImage", profile);
      }

      const response = await axios.patch(
        "http://localhost:5057/api/Account",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token.token.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status == 200) {
        ToastSuccess("Your Profile Updated Successfully!!");
        if (emailId != token.token.email) {
          dispatch(logout());
          localStorage.removeItem("role");
          router.push("/");
        }
      }
      if (response.status == 500 || response.status == 400) {
        ToastError("Please Provide Valid Data");
      }
    } catch (error) {
      console.error("There was an error updating the profile!", error);
    }
  };

  const handleChangePassword = async () => {
    try {
      const data = {Password:password,NewPassword:newPassword,ConfirmNewPassword:confirmNewPassword};

      const response = await axios.put(
        "http://localhost:5057/api/Account",
        data,
        {
          headers: {
            Authorization: `Bearer ${token.token.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status == 200) {
        ToastSuccess("Your Password Updated Successfully!!");
        if (emailId != token.token.email) {
          dispatch(logout());
          localStorage.removeItem("role");
          router.push("/");
        }
      }
      if (response.status == 500 || response.status == 400) {
        ToastError("Please Provide Valid Data");
      }
    } catch (error) {
      console.error("There was an error updating the profile!", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="p-4">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md overflow-hidden">
          <div className="relative">
            <Image
              src={PB}
              alt="Background"
              className="w-full h-40 object-cover"
            />
            <div className="absolute inset-x-0 top-20 flex justify-center">
              <div className="w-36 h-36 bg-indigo-50 rounded-full flex items-center justify-center shadow-lg relative">
                {isEditing ? (
                  <>
                    {profileImg ? (
                      <Image
                        src={profileImg}
                        alt="Profile"
                        width={144}
                        height={144}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    <input
                      type="file"
                      className="absolute w-full h-full opacity-0 cursor-pointer"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </>
                ) : profileImg ? (
                  <Image
                    src={profileImg}
                    alt="Profile"
                    width={144}
                    height={144}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </div>
          </div>
          {!isEditing && !isPasswordUpdate && (
            <>
              <div className="flex justify-center mt-20">
                <div className="text-center">
                  <h2 className="mt-4 text-xl font-semibold">{name}</h2>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 p-4 items-center justify-center">
                <div className="text-center w-full md:w-3/4 mx-auto">
                  <div
                    className="p-4 border rounded-md bg-slate-200 shadow-md transform transition duration-300 hover:scale-105"
                    onClick={handleEditClick}
                  >
                    <div className="mb-2 flex item-center justify-center">
                      <i className="fas fa-user text-xl">
                        <FaAddressCard size={30} />
                      </i>
                    </div>
                    <h3 className="font-semibold text-xl text-orange-500">
                      Profile Details
                    </h3>
                  </div>
                </div>

                <div className="text-center w-full md:w-3/4 mx-auto">
                  <div onClick={handlePasswordEditClick} className="p-4 border text-center bg-slate-200 shadow-md rounded-md transform transition duration-300 hover:scale-105">
                    <div className="mb-2 flex item-center justify-center">
                      <i className="fas fa-user text-xl">
                        <RiLockPasswordFill size={30} />
                      </i>
                    </div>
                    <h3 className="font-semibold text-xl text-orange-500">
                      Change Password
                    </h3>
                  </div>
                </div>

                <div className="text-center w-full md:w-3/4 mx-auto">
                  <div
                    className="p-4 border text-center bg-slate-200 shadow-md rounded-md transform transition duration-300 hover:scale-105"
                    onClick={handleClick}
                  >
                    <div className="mb-2 flex item-center justify-center">
                      <i className="fas fa-user text-xl">
                        <IoLogOut size={30} />
                      </i>
                    </div>
                    <h3 className="font-semibold text-xl text-orange-500">
                      Logout
                    </h3>
                  </div>
                </div>
              </div>
            </>
          )}

          {isEditing && (
            <>
              <div className="flex justify-center mt-20">
                <div className="text-center">
                  <h2 className="mt-4 text-xl font-semibold">Edit Profile</h2>
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-4 px-5 py-8">
                  <div className="flex items-center">
                    <label className="w-1/4 text-gray-700" htmlFor="name">
                      Name
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/4 text-gray-700" htmlFor="status">
                      Email Id
                    </label>
                    <input
                      value={emailId}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/4 text-gray-700" htmlFor="name">
                      Contact No
                    </label>
                    <input
                      value={phoneNo}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </div>
                <div className="flex justify-center mt-6 space-x-4">
                  <button
                    onClick={handleSaveClick}
                    className="bg-green-500 hover:bg-green-800 text-white px-4 py-2 rounded-md"
                  >
                    Save & Change
                  </button>
                  <button
                    onClick={handleCancelClick}
                    className="bg-red-500 hover:bg-red-800 text-white px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </>
          )}

          {isPasswordUpdate && (
            <>
              <div className="flex justify-center mt-20">
                <div className="text-center">
                  <h2 className="mt-4 text-xl font-semibold">Change Password</h2>
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-4 px-5 py-8">
                  <div className="flex items-center">
                    <label className="w-1/4 text-gray-700" htmlFor="name">
                      Old Password
                    </label>
                    <input
                    type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/4 text-gray-700" htmlFor="status">
                      New Password
                    </label>
                    <input
                    type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/4 text-gray-700" htmlFor="name">
                      Confirm New Password
                    </label>
                    <input
                    type="password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                   {(password != confirmNewPassword) && <p className="text-red-500">Entered Password Should Not Match</p>}
                  </div>
                </div>
                <div className="flex justify-center mt-6 space-x-4">
                  <button
                    onClick={handlePasswordSaveClick}
                    className="bg-green-500 hover:bg-green-800 text-white px-4 py-2 rounded-md"
                  >
                    Save & Change
                  </button>
                  <button
                    onClick={handlePasswordCancelClick}
                    className="bg-red-500 hover:bg-red-800 text-white px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileComponent;
