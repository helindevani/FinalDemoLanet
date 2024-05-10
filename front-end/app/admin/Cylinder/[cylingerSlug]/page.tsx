"use client";
import { useState, useEffect } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Category, fetchCategories } from "@/store/categorySlice";
import { ToastError, ToastSuccess } from "@/components/ToastError";
import { ToastContainer } from "react-toastify";
import { Product, updateProduct } from "@/store/productSlice";
import { Brand, fetchBrands } from "@/store/supplierSlice";
import Image from "next/image";

interface Formdata {
    ProductId : string;
  ProductName: string;
  ProductImage: File | null;
  BrandId: string;
  CategoryId: string;
  Quantity: string;
  UnitPrice: string;
  Status: string;
  CreatedBy: string;
}

const EditProduct = () => {
  const [productImage, setProductImage] = useState<string>("");
  const router = useRouter();
  const [error, setError] = useState<any>("");
  const [formData, setFormData] = useState<Formdata>({
    ProductId : "",
    ProductName: "",
    ProductImage: null,
    BrandId: "",
    CategoryId: "",
    Quantity: "",
    UnitPrice: "",
    Status: "",
    CreatedBy: "",
  });
  const pathname = usePathname();
  const productId = pathname.split("/")[3];
  const dispatch = useDispatch<any>();
  const product = useSelector((state: any) =>
    state.product.products.find(
      (product: any) => product.productId === productId
    )
  );
  const brands: Brand[] = useSelector((state: any) => state.brand.brands);
  const categories: Category[] = useSelector(
    (state: any) => state.category.categories
  );
  const token = Cookies.get("token");

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchCategories());
  }, [dispatch, token]);

  useEffect(() => {
      if (product) {
        setFormData({
        ProductId:productId,
          ProductName: product.productName,
          ProductImage: null,
          BrandId: product.brandId,
          CategoryId: product.categoryId,
          Quantity: product.quantity,
          UnitPrice: product.unitPrice,
          Status: getStatusString(product.status),
          CreatedBy: product.createdBy,
        });
        setProductImage(product.productImage);
    };
  }, [product,productId]);

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
    console.log(formData)
    try {
      const formDataToSend : any = new FormData();
      for (const [key, value] of Object.entries(formData)) {
        if ((value as any) instanceof File) {
            console.log("file data")
          formDataToSend.append(key, value as any);
        } else if (value !== null && typeof value !== "undefined") {
            console.log("undefined data")
          formDataToSend.append(key, String(value));
        }else if(!(value instanceof File)){
            formDataToSend.append("ProductImage","")
        }
      }
      console.log(formDataToSend.get("Quantity"));
      console.log(formDataToSend.get("quantity"));
      const response = await dispatch(updateProduct({productId,data:formDataToSend}));

      console.log("Product Updated successfully:", response.payload);
      ToastSuccess("Product Updated Successfully!!");
      router.push("/admin/Cylinder/ManageCylinders");
    } catch (error) {
      console.error("Error creating brand:", error);
      ToastError("Product Not Updated Successfully");
    }
  };

  const getStatusString = (status: number) => {
    switch (status) {
      case 0:
        return "Available";
      case 1:
        return "NotAvailable";
      default:
        return "";
    }
  };

  return (
    <>
      <AdminSidebar>
        <ToastContainer />
        <div className="page-wrapper">
          <div className="flex justify-between top-0 bg-white p-3 h-10 mb-10 sm:h-auto w-auto text-sm">
            <h3 className="text-xl text-blue-800 font-semibold text-primary">
              Edit Product Management
            </h3>
            <nav className="flex items-center space-x-2">
              <a href="#" className="text-gray-400 hover:text-blue-800">
                Home
              </a>
              <span className="text-gray-400">{`>`}</span>
              <span className="text-gray-600">Edit Product</span>
            </nav>
          </div>

          <div className="container m-auto">
            <div className="max-w-4xl mx-auto h-screen">
              <div className="bg-white shadow-md rounded px-8 pt-6 pb-15 m-10 w-3/4 h-auto">
                <h1>Product Info</h1>
                <form className="space-y-4 px-5 py-8" onSubmit={handleSubmit}>
                  <div className="flex items-center">
                    <div
                      className="w-1/4 text-gray-700"
                    >
                      Product Image
                    </div>
                    <div className="w-3/4 h-10 items-center">
                    <Image
                      src={productImage}
                      alt="Product Image"
                      height={50}
                      width={50}
                    ></Image>
                    </div>
                    
                  </div>
                  <div className="flex items-center">
                    <label
                      className="w-1/4 text-gray-700"
                      htmlFor="ProductImage"
                    >
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
                    <label
                      className="w-1/4 text-gray-700"
                      htmlFor="productName"
                    >
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
                    <label
                      className="w-1/4 text-gray-700"
                      htmlFor="categoryName"
                    >
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
    </>
  );
};

export default EditProduct;
