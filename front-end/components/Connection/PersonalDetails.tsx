'use client';
import { fetchProducts ,Product} from "@/store/productSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

interface changeType{
  onChange : any
}

export default function PersonalDetails({ onChange } : changeType) {
  const dispatch = useDispatch<any>();
  // const brands: Brand[] = useSelector((state: any) => state.brand.brands);
  const products: Product[] = useSelector(
    (state: any) => state.product.products
  );

  const token = Cookies.get("token");

  useEffect(() => {
    // dispatch(fetchBrands());
    dispatch(fetchProducts());
  }, [dispatch, token]);


  const handleChange = (e : any) => {
    const { name, value } = e.target;
    onChange({ [name]: value }); 
  };
  return (
    <>
      <h2>Personal Details</h2>
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 p-5">
        <div>
          <label
            htmlFor="FirstName"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            First Name
          </label>
          <div className="mt-2.5">
            <input
              type="text"
              name="FirstName"
              id="FirstName"
              onChange={handleChange}
              className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required/>
          </div>
        </div>
        <div>
          <label
            htmlFor="LastName"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Last Name
          </label>
          <div className="mt-2.5">
            <input
              type="text"
              name="LastName"
              id="LastName"
              onChange={handleChange}
              required
              className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        <div className="flex ">
          <div className="pr-4 w-1/2">
            <label
              htmlFor="Gender"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Gender
            </label>
            <div className="mt-2.5">
              <select
                className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Gender"
                name="Gender"
                required
                onChange={handleChange}
              >
                <option value="">--------SELECT---------</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="w-1/2">
            <label
              htmlFor="MaritalStatus"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Marital Status
            </label>
            <div className="mt-2.5">
              <select
                className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="MaritalStatus"
                name="MaritalStatus"
                required
                onChange={handleChange}
              >
                <option value="">--------SELECT---------</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="UnMarried">UnMarried</option>
                <option value="Divorced">Divorced</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex ">
          <div className="pr-4 w-1/2">
            <label
              htmlFor="Dob"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Date Of Birth
            </label>
            <div className="mt-2.5">
              <input
                type="Date"
                name="Dob"
                id="Dob"
                required
                onChange={handleChange}
                className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <div className="w-1/2">
            <label
              htmlFor="Nationality"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Nationality
            </label>
            <div className="mt-2.5">
              <select
                className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Nationality"
                name="Nationality"
                required
                onChange={handleChange}
              >
                <option value="">--------SELECT---------</option>
                <option value="Indian">Indian</option>
                <option value="NonIndian">Non Indian</option>
              </select>
            </div>
          </div>
        </div>

        <div className="col-span-2 border p-4">
          <h2>Select Relative</h2>
          <div className="flex items-center">
            <input
              type="radio"
              name="RelatedType"
              value={0}
              id="Father"
              className="mx-2"
              onChange={handleChange}
            />
            <label htmlFor="Father" className="mr-2">
              Father
            </label>
            <input
              type="radio"
              name="RelatedType"
              value={1}
              id="Spouse"
              className="mx-2"
              onChange={handleChange}
            />
            <label htmlFor="Spouse">Spouse</label>
          </div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 p-5">
            <div>
              <label
                htmlFor="RelatedFirstName"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                First Name
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="RelatedFirstName"
                  id="RelatedFirstName"
                  onChange={handleChange}
                  required
                  className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="RelatedLastName"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Last Name
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="RelatedLastName"
                  id="RelatedLastName"
                  required
                  onChange={handleChange}
                  className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="Address"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Address
          </label>
          <div className="mt-2.5">
            <textarea
              name="Address"
              id="Address"
              rows={4}
              onChange={handleChange}
              required
              className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>
        </div>
        <div className="flex ">
          <div className="pr-4 w-1/2">
            <label
              htmlFor="City"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              City/Town/Village
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="City"
                id="City"
                onChange={handleChange}
                required
                className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <div className="w-1/2">
            <label
              htmlFor="PinCode"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Pin Code
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="PinCode"
                id="PinCode"
                required
                onChange={handleChange}
                className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
        </div>
        <div className="flex ">
          <div className="pr-4 w-1/2">
            <label
              htmlFor="District"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              District
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="District"
                id="District"
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="w-1/2">
            <label
              htmlFor="State"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              State
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="State"
                id="State"
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="flex ">
          {/* <div className="pr-4 w-1/2">
            <label
              htmlFor="BrandId"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Supplier
            </label>
            <div className="mt-2.5">
              <select
                className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="BrandId"
                name="BrandId"
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
          </div> */}
          <div className="w-1/2">
            <label
              htmlFor="ProductId"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Product
            </label>
            <div className="mt-2.5">
              <select
                className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="ProductId"
                name="ProductId"
                onChange={handleChange}
                required
              >
                <option value="">--------SELECT---------</option>
                {products.map((product: any) => (
                      <option key={product.productId} value={product.productId}>
                        {product.productName} <span>
                          {product.brand.brandName}
                        </span>
                      </option>
                    ))}
              </select>
            </div>
          </div>
        </div>
        <div className="flex ">
          <div className="pr-4 w-1/2">
            <label
              htmlFor="EmailId"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Email Id
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                name="EmailId"
                id="EmailId"
                onChange={handleChange}
                required
                className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <div className="w-1/2">
            <label
              htmlFor="PhoneNumber"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Mobaile Number
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="PhoneNumber"
                id="PhoneNumber"
                onChange={handleChange}
                required
                className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}
