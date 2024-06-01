import React from "react";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastError = (error: string) => {
  return (
    <>
      {toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      })}
    </>
  );
};

export const ToastSuccess = (message: string) => {
  return (
    <>
      {toast.success(message, {
       position: "top-right",
       autoClose: 3000,
       hideProgressBar: false,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,
       progress: undefined,
       theme: "colored",
       transition: Bounce,
      })}
    </>
  );
};

export const ToastWarning = (message: string) => {
  return (
    <>
      {toast.warning(message, {
       position: "top-right",
       autoClose: 3000,
       hideProgressBar: false,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,
       progress: undefined,
       theme: "colored",
       transition: Bounce,
      })}
    </>
  );
};