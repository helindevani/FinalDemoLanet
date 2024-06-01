"use client";
import { useState, useEffect } from "react";
import AdminSidebar from "@/components/Sidebar/AdminSidebar";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { updateCategory } from "@/store/categorySlice";
import { ToastError, ToastSuccess } from "@/components/ToastError";
import { ToastContainer } from "react-toastify";
import { getStatusString } from "@/components/Enums/EnumConverter";

const EditCategory = () => {
  const [categoryName, setCategoryName] = useState<string>("");
  const [categoryStatus, setCategoryStatus] = useState<string>("");
  const [error, setError] = useState<any>("");
  const router = useRouter();
  const pathname = usePathname();
  const categoryId = pathname.split("/")[3];
  const dispatch = useDispatch<any>();
  const category = useSelector((state: any) =>
    state.category.categories.find(
      (category: any) => category.categoryId === categoryId
    )
  );

  useEffect(() => {
    return () => {
      if (category) {
        setCategoryName(category.categoryName);
        setCategoryStatus(getStatusString(category.categoryStatus));
      }
    };
  }, [category]);

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
      CategoryId: categoryId,
      CategoryName: categoryName,
      CategoryStatus: categoryStatus,
      CreatedBy: userName,
    };

    try {
      const response = await dispatch(updateCategory({ categoryId, data }));
      console.log("Category Updated successfully:", response.payload);
      ToastSuccess("Category Updated Successfully!!");
      router.push("/admin/categories/manage");
    } catch (error) {
      console.error("Error creating Category:", error);
      ToastError("Category Not Updated!!");
    }
  };

  return (
    <>
        <ToastContainer />
        <div className="page-wrapper">
          <div className="flex justify-between top-0 bg-white p-3 h-10 mb-10 sm:h-auto w-auto text-sm">
            <h3 className="text-xl text-blue-800 font-semibold text-primary">
              Edit Category Management
            </h3>
            <nav className="flex items-center space-x-2">
              <a href="#" className="text-gray-400 hover:text-blue-800">
                Home
              </a>
              <span className="text-gray-400">{`>`}</span>
              <span className="text-gray-600">Edit Category</span>
            </nav>
          </div>

          <div className="container m-auto">
            <div className="max-w-4xl mx-auto h-screen">
              <div className="bg-white shadow-md rounded px-8 pt-6 pb-15 m-10 w-3/4 h-1/2">
                <form className="space-y-4 px-5 py-8" onSubmit={handleSubmit}>
                  <div className="flex items-center">
                    <label className="w-1/4 text-gray-700" htmlFor="name">
                      Categories Name
                    </label>
                    <input
                      className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      type="text"
                      placeholder="Category Name"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/4 text-gray-700" htmlFor="status">
                      Status
                    </label>
                    <select
                      className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="status"
                      name="status"
                      value={categoryStatus}
                      onChange={(e) => setCategoryStatus(e.target.value)}
                    >
                      <option value="">--SELECT--</option>
                      <option value="Available">Available</option>
                      <option value="NotAvailable">Not Available</option>
                    </select>
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
    </>
  );
};

export default EditCategory;
