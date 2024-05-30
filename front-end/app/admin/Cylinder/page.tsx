"use client";
import AdminSidebar from "@/components/AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchBrands, Brand } from "@/store/supplierSlice";
import { addProduct } from "@/store/productSlice";
import { useState } from "react";
import Cookies from "js-cookie";
import { fetchCategories, Category } from "@/store/categorySlice";
import { ToastError, ToastSuccess } from "@/components/ToastError";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

interface Formdata {
  ProductName: string;
  ProductImage: File | null;
  BrandId: string;
  CategoryId: string;
  Quantity: string;
  UnitPrice: string;
  Status: string;
  CreatedBy: string;
}

const AddProduct = () => {
  const router = useRouter();
  const dispatch = useDispatch<any>();
  const [error, setError] = useState<any>("");
  const [formData, setFormData] = useState({
    ProductName: "",
    ProductImage: null,
    BrandId: "",
    CategoryId: "",
    Quantity: "",
    UnitPrice: "",
    Status: "",
    CreatedBy: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    }
  };

  const brands: Brand[] = useSelector((state: any) => state.brand.brands);
  const categories: Category[] = useSelector(
    (state: any) => state.category.categories
  );

  const token = Cookies.get("token");

  useEffect(() => {
    dispatch(fetchBrands({page:100,pageSize:100}));
    dispatch(fetchCategories({page:100,pageSize:100}));
  }, [dispatch, token]);

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

    formData.CreatedBy = userName;
    try {
      const formDataToSend: any = new FormData();
      for (const [key, value] of Object.entries(formData)) {
        if ((value as any) instanceof File) {
          formDataToSend.append(key, value as any);
        } else if (value !== null && typeof value !== "undefined") {
          formDataToSend.append(key, String(value));
        }
      }
      const response = await dispatch(addProduct(formDataToSend));

          console.log("Product Added successfully:", response.payload);
            ToastSuccess("Product Added Successfully!!");
            router.push('/admin/cylinder/manage')
       
      } catch (error) {
        console.error("Error creating brand:", error);
        ToastError("Product Not Added Successfully");
      }
  };

  return (
    <AdminSidebar>
      <ToastContainer/>
      <div className="page-wrapper">
        <div className="flex justify-between top-0 bg-white p-3 h-10 mb-10 sm:h-auto w-auto text-sm">
          <h3 className="text-xl text-blue-800 font-semibold text-primary">
            Add Product
          </h3>
          <nav className="flex items-center space-x-2">
            <a href="#" className="text-gray-400 hover:text-blue-800">
              Home
            </a>
            <span className="text-gray-400">{`>`}</span>
            <span className="text-gray-600">Add Product</span>
          </nav>
        </div>

        <div className="container m-auto">
          <div className="max-w-4xl mx-auto h-screen">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-15 m-10 w-3/4 h-auto">
              <form className="space-y-4 px-5 py-8" onSubmit={handleSubmit}>
                <div className="flex items-center">
                  <label className="w-1/4 text-gray-700" htmlFor="ProductImage">
                    Product Image
                  </label>
                  <input
                    className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="ProductImage"
                    name="ProductImage"
                    type="file"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="flex items-center">
                  <label className="w-1/4 text-gray-700" htmlFor="productName">
                    Product Name
                  </label>
                  <input
                    className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="productName"
                    type="text"
                    name="ProductName"
                    value={formData.ProductName}
                    onChange={handleChange}
                    placeholder="Product Name"
                  />
                </div>
                <div className="flex items-center">
                  <label className="w-1/4 text-gray-700" htmlFor="quantity">
                    Quantity
                  </label>
                  <input
                    className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="quantity"
                    type="text"
                    name="Quantity"
                    value={formData.Quantity}
                    onChange={handleChange}
                    placeholder="Quantity"
                  />
                </div>
                <div className="flex items-center">
                  <label className="w-1/4 text-gray-700" htmlFor="rate">
                    Rate
                  </label>
                  <input
                    className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="rate"
                    type="text"
                    name="UnitPrice"
                    value={formData.UnitPrice}
                    onChange={handleChange}
                    placeholder="Rate"
                  />
                </div>
                <div className="flex items-center">
                  <label className="w-1/4 text-gray-700" htmlFor="brandName">
                    Brand Name
                  </label>
                  <select
                    className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="brandName"
                    name="BrandId"
                    value={formData.BrandId}
                    onChange={handleChange}
                  >
                    <option value="">--------SELECT---------</option>
                    {brands.map((supplier: any) => (
                      <option key={supplier.brandId} value={supplier.brandId}>
                        {supplier.brandName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center">
                  <label className="w-1/4 text-gray-700" htmlFor="categoryName">
                    Category Name
                  </label>
                  <select
                    className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="categoryName"
                    name="CategoryId"
                    value={formData.CategoryId}
                    onChange={handleChange}
                  >
                    <option value="">--------SELECT---------</option>
                    {categories.map((category: any) => (
                      <option
                        key={category.categoryId}
                        value={category.categoryId}
                      >
                        {category.categoryName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center">
                  <label
                    className="w-1/4 text-gray-700"
                    htmlFor="productStatus"
                  >
                    Status
                  </label>
                  <select
                    className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="productStatus"
                    name="Status"
                    value={formData.Status}
                    onChange={handleChange}
                  >
                    <option value="">--------SELECT---------</option>
                    <option value="Available">Available</option>
                    <option value="NotAvailable">Not Available</option>
                  </select>
                </div>

                <div className="flex items-center justify-start">
                  <button
                    type="submit"
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
    </AdminSidebar>
  );
};

export default AddProduct;
