'use client';
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ToastError, ToastWarning } from "@/components/ToastError";
import { ToastContainer } from "react-toastify";

export default function NewConnection() {
  const router=useRouter();
  const token= Cookies.get("token");

  const handelAppliedNewConnection=async ()=>{
    try {
      const response = await axios.get("http://localhost:5057/api/Connections/checkConnectionApplied", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200 && response.data) {
        ToastWarning("You Have Already Applied");
      }
      else{
        router.push("/customer/newConnection/kycForm");
      }
    } catch (error) {
      console.error("Error checking existing connection:", error);
    }
};

  const handelLinkConnection=async()=>{
    try {
      const response = await axios.get(
        `http://localhost:5057/api/User/AppliedNewConnection`,{
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if(response.status==204){
        ToastWarning("Sorry You have no any Approve Connection Found So First Applied New Connection!!")
      }
      if (response.data.status == "Pending") {
        ToastWarning(`Your LPG No Is ${response.data.lpgNo} In Pending State!!`);
      }
      if (response.data.status == "Success") {
        try {
          const response = await axios.get("http://localhost:5057/api/Connections/checkConnectionLinked", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.status === 200 && response.data) {
            ToastWarning("You Have Already Linked Account");
          }
          else{
            router.push("/customer/newConnection/linkConnection");
          }
        } catch (error) {
          console.error("Error checking existing connection:", error);
        }
      }
      if (response.data.status == "Rejected") {
        window.prompt("Your Connection Request Was Rejected Please Reapply!!")
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    
    
  }


  return (
    <>
    <ToastContainer/>
        <div className="page-wrapper">
          <div className="flex justify-between top-0 bg-white p-3 h-10 mb-10 sm:h-auto w-auto text-sm">
            <h3 className="text-xl text-blue-800 font-semibold text-primary">
              Connection
            </h3>
            <nav className="flex items-center space-x-2">
              <a href="#" className="text-gray-400 hover:text-blue-800">
                Home
              </a>
              <span className="text-gray-400">{`>`}</span>
              <span className="text-gray-600">Connection</span>
            </nav>
          </div>

          <div className="container m-auto h-screen">
            <div className="w-auto">
              <div className="bg-white shadow-md rounded m-10 w-auto h-auto">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 p-5">
                  <div className="text-center mx-auto w-[401px]">
                    <div className="m-5 border py-5 px-16 rounded-full bg-slate-200 shadow">
                      <b> Apply For New Connection</b><br/>
                      <button className="block mx-auto my-5 w-auto rounded-md bg-orange-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handelAppliedNewConnection}> Submit </button>
                    </div>
                  </div>
                  <div className="text-center mx-auto w-[401px]">
                    <div className="m-5 border py-5 px-16 rounded-full bg-slate-200 shadow">
                      <b> Link Your Connection</b><br/>
                      <button className="block mx-auto my-5 w-auto rounded-md bg-orange-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handelLinkConnection}> Submit </button>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
