'use client';
import React, { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { registerUser } from "@/store/authSlice";
import Footer from "@/components/Layout/Footer";
import { isValidEmail,isValidMobile,isValidPassword } from "@/components/Enums/EnumConverter";
import { AppDispatch } from "@/store";
import { ToastError, ToastSuccess } from "@/components/ToastError";
import { ToastContainer } from "react-toastify";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Register: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    Email: "",
    Name: "",
    MobaileNo: "",
    Password: "",
    ConfirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    Email: false,
    MobaileNo: false,
    Password: false,
    ConfirmPassword: false,
  });
  const router=useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate fields
    if (name === "Email") {
      setErrors({ ...errors, Email: !isValidEmail(value) });
    }
    if (name === "MobaileNo") {
      setErrors({ ...errors, MobaileNo: !isValidMobile(value) });
    }
    if (name === "Password") {
      setErrors({ ...errors, Password: !isValidPassword(value) });
    }
    if (name === "ConfirmPassword") {
      setErrors({ ...errors, ConfirmPassword: value !== formData.Password });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isFormValid = !errors.Email && !errors.MobaileNo && !errors.Password && !errors.ConfirmPassword;
    if (isFormValid) {
      try{
       const response= await dispatch(registerUser(formData));
        if(response.meta.requestStatus == 'fulfilled'){
          ToastSuccess("Register Successfully Your Account Please Login Your Account!!")
          router.push("/auth/login")
        }
      }catch (error : any) {
        ToastError("Failed To Register Account Please Try Again!!")
        console.error("Login failed:", error);
      }
    }
  };

  return (
    <>
    <ToastContainer/>
      <section className="bg-gray-50 dark:bg-gray-900 p-7">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto :h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="Email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                  <input type="email" name="Email" id="Email" value={formData.Email} onChange={handleInputChange} className={`bg-gray-50 border ${errors.Email ? 'border-red-500' : 'border-gray-300'} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="name@gamil.com" required />
                  {errors.Email && <p className="text-red-500 text-xs mt-1">Invalid email format</p>}
                </div>
                <div>
                  <label htmlFor="Name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                  <input type="text" name="Name" id="Name" value={formData.Name} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name" required />
                </div>
                <div>
                  <label htmlFor="MobaileNo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Mobile No</label>
                  <input type="text" name="MobaileNo" id="MobaileNo" value={formData.MobaileNo} onChange={handleInputChange} className={`bg-gray-50 border ${errors.MobaileNo ? 'border-red-500' : 'border-gray-300'} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="9999999999" required />
                  {errors.MobaileNo && <p className="text-red-500 text-xs mt-1">Invalid mobile number</p>}
                </div>
                <div>
                  <label htmlFor="Password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <div className="relative">
                    <input type={showPassword ? "text" : "password"} name="Password" id="Password" value={formData.Password} onChange={handleInputChange} placeholder="••••••••" className={`bg-gray-50 border ${errors.Password ? 'border-red-500' : 'border-gray-300'} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} required />
                    <button type="button" className="absolute inset-y-0 right-0 flex items-center px-3 bg-white-100 text-gray-600 dark:bg-gray-600 dark:text-gray-300 focus:outline-none" onClick={togglePasswordVisibility}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.Password && <p className="text-red-500 text-xs mt-1">Password must be at least 5 characters long, contain a lowercase letter, and a digit</p>}
                </div>
                <div>
                  <label htmlFor="ConfirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                  <div className="relative">
                    <input type={showPassword ? "text" : "password"} name="ConfirmPassword" id="ConfirmPassword" value={formData.ConfirmPassword} onChange={handleInputChange} placeholder="••••••••" className={`bg-gray-50 border ${errors.ConfirmPassword ? 'border-red-500' : 'border-gray-300'} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} required />
                    <button type="button" className="absolute inset-y-0 right-0 flex items-center px-3 bg-white-100 text-gray-600 dark:bg-gray-600 dark:text-gray-300 focus:outline-none" onClick={togglePasswordVisibility}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.ConfirmPassword && <p className="text-red-500 text-xs mt-1">Passwords do not match</p>}
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-orange-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                  </div>
                </div>
                <button type="submit" className="w-full text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-orange-700 dark:focus:ring-primary-800">Create an account</button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account? <Link href="login" className="font-medium text-orange-600 hover:underline dark:text-primary-500">Login here</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Register;
