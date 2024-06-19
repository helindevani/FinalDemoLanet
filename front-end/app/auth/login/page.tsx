"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { loginUser } from "@/store/authSlice";
import Footer from "@/components/Layout/Footer";
import { ToastError, ToastSuccess } from "@/components/ToastError";
import { ToastContainer } from "react-toastify";
import { JwtPayload, decode } from "jsonwebtoken";
import { getMessaging, getToken } from "firebase/messaging";
import { initializeApp } from "firebase/app";
import { isValidEmail } from "@/components/Enums/EnumConverter";
import { LoginCredentials, RootState } from "@/components/TypeInterface/AllType";
import LoadingSpinner from "@/components/Items/Spinner/LoadingSpinner";

const Login: React.FC = () => {
  const dispatch = useDispatch<any>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);
  const router = useRouter();
  const { loading } = useSelector((state: RootState) => state.auth);

  const firebaseConfig = {
    apiKey: "AIzaSyDxZiowRmEKy48jbLzRjUPcibF9sSkzBxA",
    authDomain: "refillsmart-59b9d.firebaseapp.com",
    projectId: "refillsmart-59b9d",
    storageBucket: "refillsmart-59b9d.appspot.com",
    messagingSenderId: "385094691529",
    appId: "1:385094691529:web:7a83116616c16fabf47b18",
    measurementId: "G-5919513J9P"
  };

  const vapidkeys = process.env.NEXT_PUBLIC_VAPIDKEY || "";

  const app = initializeApp(firebaseConfig);
  const messaging = getMessaging(app);

  const requestForToken = async () => {
    try {
      const serviceWorkerRegistration = await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js"
      );
      const currentToken = await getToken(messaging, {
        vapidKey: vapidkeys,
        serviceWorkerRegistration,
      });

      if (currentToken) {
        return currentToken;
      } else {
        return null;
      }
    } catch (err) {
      return null;
    }
  };

  const submitHandler = async (
    event: React.FormEvent<HTMLFormElement> | any
  ) => {
    event.preventDefault();

    if (!isValidEmail(email)) {
      ToastError("Invalid email format");
      return;
    }
    
    try {
      const fcmToken =await requestForToken();
      console.log(fcmToken);
      const credentials: LoginCredentials = { email, password, rememberPassword, fcmToken };
      const response = await dispatch(loginUser(credentials)).unwrap();
      if (response.token!=null) {
        ToastSuccess("Login Successfully");
        const decodedToken = decode(response.token) as JwtPayload;
        let roles =
          decodedToken[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ];
        if (typeof roles === "object") {
          roles = roles[0];
          
          if (roles === "Admin") {
            router.push("/admin");
          }
        } else {
          if (roles === "User") {
            router.push("/customer");
          } else if (roles === "Staff") {
            router.push("/staff");
          }
        }
      }
    } catch (error : any) {
      ToastError("Invalid Email Or Password!!")
      console.error("Login failed:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <>
      <ToastContainer className="z-50" />

      {loading && <LoadingSpinner/>}
    {!loading && <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center px-3 bg-white-100 text-gray-600 dark:bg-gray-600 dark:text-gray-300 focus:outline-none"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        checked={rememberPassword}
                        onChange={() => setRememberPassword(!rememberPassword)}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <Link
                    href="forgotpassword"
                    className="text-sm font-medium text-orange-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </Link>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-orange-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                 {!loading && <p>Sign in</p> }{loading && <p>Signing.....</p>}
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link
                    href="register"
                    className="font-medium text-orange-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>}
      <Footer />
    </>
  );
};

export default Login;
