'use client';
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { FaDeleteLeft } from "react-icons/fa6";

export default function NewConnection() {
  const router=useRouter();

  const handelSubmit=()=>{
    router.push("/customer/NewConnection/KycForm");
  }
  return (
    <>
      <Sidebar>
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
              <div className="bg-white shadow-md rounded px-8 pt-14 pb-15 m-10 w-auto h-auto">
                <h1>
                  We Could Not Find Connection For You Please Select Any Option
                  Below
                </h1>
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 p-5">
                  <div className="text-center mx-auto  w-[401px]">
                    <div className="m-5 border py-5 px-16 rounded-full border-gray-700">
                      <b> Apply For New Connection</b><br/>
                      <button className="block mx-auto my-5 w-auto rounded-md bg-orange-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handelSubmit}> Submit </button>
                    </div>
                  </div>
                  <div className="text-center mx-auto w-[401px]">
                    <div className="m-5 border py-5 px-16 rounded-full border-gray-700">
                      <b> Link Your Connection</b><br/>
                      <button className="block mx-auto my-5 w-auto rounded-md bg-orange-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"> Submit </button>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </Sidebar>
    </>
  );
}
