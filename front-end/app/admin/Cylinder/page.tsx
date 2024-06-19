'use client';
import AdminSidebar from "@/components/Sidebar/AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { fetchBrands, Brand } from "@/store/supplierSlice";
import { addProduct } from "@/store/productSlice";
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
  const [errors, setErrors] = useState<any>({});
  const [formData, setFormData] = useState<Formdata>({
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

  useEffect(() => {
    dispatch(fetchBrands({ page: 1, pageSize: 100 }));
    dispatch(fetchCategories({ page: 1, pageSize: 100 }));
  }, [dispatch]);

  const validate = () => {
    const errors: any = {};
    if (!formData.ProductName) errors.ProductName = "Product Name is required.";
    if (!formData.ProductImage) errors.ProductImage = "Product Image is required.";
    if (!formData.BrandId) errors.BrandId = "Brand is required.";
    if (!formData.CategoryId) errors.CategoryId = "Category is required.";
    if (!formData.Quantity) errors.Quantity = "Quantity is required.";
    if (!formData.UnitPrice) errors.UnitPrice = "Unit Price is required.";
    if (!formData.Status) errors.Status = "Status is required.";
    return errors;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const token = Cookies.get("token");
    if (!token) {
      setErrors({ token: "JWT token not found" });
      return;
    }

    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const userName =
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
      ];
      formData.CreatedBy=userName;
    const formDataToSend: any = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      if ((value as any) instanceof File) {
        formDataToSend.append(key, value as any);
      } else if (value !== null && typeof value !== "undefined") {
        formDataToSend.append(key, String(value));
      }
    }

    try {
      const response = await dispatch(addProduct(formDataToSend));

      if (response.meta.requestStatus === "fulfilled") {
        ToastSuccess("Product Added Successfully!!");
        router.push("/admin/cylinder/manage");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      ToastError("Product Not Added Successfully");
    }
  };

  return (
    <>
      <ToastContainer />
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
          <div className="max-w-4xl mx-auto">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-15 m-10 h-auto">
              <form className="space-y-4 px-5 py-8" onSubmit={handleSubmit}>
                <div className="flex items-center">
                  <label className="w-1/4 text-gray-700" htmlFor="ProductImage">
                    Product Image <span className="text-red-500">*</span>
                  </label>
                  <div className="w-3/4 relative">
                    <input
                      className={`w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        errors.ProductImage ? "border-red-500" : ""
                      }`}
                      id="ProductImage"
                      name="ProductImage"
                      type="file"
                      onChange={handleFileChange}
                    />
                    {errors.ProductImage && (
                      <p className="absolute text-sm text-red-600">
                        {errors.ProductImage}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center mb-6">
                  <label className="w-1/4 text-gray-700" htmlFor="productName">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <div className="w-3/4 relative">
                    <input
                      className={`w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        errors.ProductName ? "border-red-500" : ""
                      }`}
                      id="productName"
                      type="text"
                      name="ProductName"
                      value={formData.ProductName}
                      onChange={handleChange}
                      placeholder="Product Name"
                    />
                    {errors.ProductName && (
                      <p className="absolute text-sm text-red-600">
                        {errors.ProductName}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center mb-6">
                  <label className="w-1/4 text-gray-700" htmlFor="quantity">
                    Quantity <span className="text-red-500">*</span>
                  </label>
                  <div className="w-3/4 relative">
                    <input
                      className={`w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        errors.Quantity ? "border-red-500" : ""
                      }`}
                      id="quantity"
                      type="text"
                      name="Quantity"
                      value={formData.Quantity}
                      onChange={handleChange}
                      placeholder="Quantity"
                    />
                    {errors.Quantity && (
                      <p className="absolute text-sm text-red-600">
                        {errors.Quantity}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center mb-6">
                  <label className="w-1/4 text-gray-700" htmlFor="rate">
                    Rate <span className="text-red-500">*</span>
                  </label>
                  <div className="w-3/4 relative">
                    <input
                      className={`w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        errors.UnitPrice ? "border-red-500" : ""
                      }`}
                      id="rate"
                      type="text"
                      name="UnitPrice"
                      value={formData.UnitPrice}
                      onChange={handleChange}
                      placeholder="Rate"
                    />
                    {errors.UnitPrice && (
                      <p className="absolute text-sm text-red-600">
                        {errors.UnitPrice}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center mb-6">
                  <label className="w-1/4 text-gray-700" htmlFor="brandName">
                    Brand Name <span className="text-red-500">*</span>
                  </label>
                  <div className="w-3/4 relative">
                    <select
                      className={`w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        errors.BrandId ? "border-red-500" : ""
                      }`}
                      id="brandName"
                      name="BrandId"
                      value={formData.BrandId}
                      onChange={handleChange}
                    >
                      <option value="">--------SELECT---------</option>
                      {brands.map((brand) => (
                        <option key={brand.brandId} value={brand.brandId}>
                          {brand.brandName}
                        </option>
                      ))}
                    </select>
                    {errors.BrandId && (
                      <p className="absolute text-sm text-red-600">
                        {errors.BrandId}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center mb-6">
                  <label className="w-1/4 text-gray-700" htmlFor="categoryName">
                    Category Name <span className="text-red-500">*</span>
                  </label>
                  <div className="w-3/4 relative">
                    <select
                      className={`w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        errors.CategoryId ? "border-red-500" : ""
                      }`}
                      id="categoryName"
                      name="CategoryId"
                      value={formData.CategoryId}
                      onChange={handleChange}
                    >
                      <option value="">--------SELECT---------</option>
                      {categories.map((category) => (
                        <option
                          key={category.categoryId}
                          value={category.categoryId}
                        >
                          {category.categoryName}
                        </option>
                      ))}
                    </select>
                    {errors.CategoryId && (
                      <p className="absolute text-sm text-red-600">
                        {errors.CategoryId}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center mb-6">
                  <label className="w-1/4 text-gray-700" htmlFor="productStatus">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <div className="w-3/4 relative ">
                    <select
                      className={`w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        errors.Status ? "border-red-500" : ""
                      }`}
                      id="productStatus"
                      name="Status"
                      value={formData.Status}
                      onChange={handleChange}
                    >
                      <option value="">--------SELECT---------</option>
                      <option value="Available">Available</option>
                      <option value="NotAvailable">Not Available</option>
                    </select>
                    {errors.Status && (
                      <p className="absolute text-sm text-red-600">
                        {errors.Status}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <button
                    type="submit"
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

export default AddProduct;
