import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { fetchProducts, Product } from "@/store/productSlice";

interface ChangeType {
  onChange: any;
}

export default function PersonalDetails({ onChange }: ChangeType) {
  const dispatch = useDispatch<any>();
  const products: Product[] = useSelector((state: any) => state.product.products);
  const token = Cookies.get("token");

  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    Gender: '',
    MaritalStatus: '',
    Dob: '',
    Nationality: '',
    RelatedType: '',
    RelatedFirstName: '',
    RelatedLastName: '',
    Address: '',
    City: '',
    PinCode: '',
    District: '',
    State: '',
    ProductId: '',
    EmailId: '',
    PhoneNumber: ''
  });

  const [errors, setErrors] = useState({
    FirstName: '',
    LastName: '',
    Gender: '',
    MaritalStatus: '',
    Dob: '',
    Nationality: '',
    RelatedType: '',
    RelatedFirstName: '',
    RelatedLastName: '',
    Address: '',
    City: '',
    PinCode: '',
    District: '',
    State: '',
    ProductId: '',
    EmailId: '',
    PhoneNumber: ''
  });

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, pageSize: 100 }));
  }, [dispatch, token]);

  const validateField = (name: string, value: string) => {
    let error = '';
    switch (name) {
      case 'EmailId':
        error = /\S+@\S+\.\S+/.test(value) ? '' : 'Invalid email address';
        break;
      case 'PhoneNumber':
        error = /^[0-9]{10}$/.test(value) ? '' : 'Invalid phone number';
        break;
      case 'FirstName':
      case 'LastName':
      case 'RelatedFirstName':
      case 'RelatedLastName':
        error = value.trim() === '' ? 'This field is required' : '';
        break;
      case 'PinCode':
        error = /^[0-9]{6}$/.test(value) ? '' : 'Invalid pin code';
        break;
      case 'Dob':
        const today = new Date();
        const dob = new Date(value);
        var age = today.getFullYear() - dob.getFullYear();
        const monthDifference = today.getMonth() - dob.getMonth();
        if (
          monthDifference < 0 ||
          (monthDifference === 0 && today.getDate() < dob.getDate())
        ) {
          age--;
        }
        error = age >= 18 ? '' : 'You must be at least 18 years old';
        break;
      default:
        error = value.trim() === '' ? 'This field is required' : '';
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    validateField(name, value);
    onChange({ [name]: value });
  };

  return (
    <>
      <h2>Personal Details</h2>
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 p-5">
        <div>
          <label htmlFor="FirstName" className="block text-sm font-semibold leading-6 text-gray-900">
            First Name <span className="text-red-500">*</span>
          </label>
          <div className="mt-2.5">
            <input
              type="text"
              name="FirstName"
              id="FirstName"
              value={formData.FirstName}
              onChange={handleChange}
              className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            {errors.FirstName && <p className="text-red-500 text-xs">{errors.FirstName}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="LastName" className="block text-sm font-semibold leading-6 text-gray-900">
            Last Name <span className="text-red-500">*</span>
          </label>
          <div className="mt-2.5">
            <input
              type="text"
              name="LastName"
              id="LastName"
              value={formData.LastName}
              onChange={handleChange}
              className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            {errors.LastName && <p className="text-red-500 text-xs">{errors.LastName}</p>}
          </div>
        </div>
        <div className="flex ">
          <div className="pr-4 w-1/2">
            <label htmlFor="Gender" className="block text-sm font-semibold leading-6 text-gray-900">
              Gender <span className="text-red-500">*</span>
            </label>
            <div className="mt-2.5">
              <select
                className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Gender"
                name="Gender"
                value={formData.Gender}
                onChange={handleChange}
                required
              >
                <option value="">--------SELECT---------</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.Gender && <p className="text-red-500 text-xs">{errors.Gender}</p>}
            </div>
          </div>
          <div className="w-1/2">
            <label htmlFor="MaritalStatus" className="block text-sm font-semibold leading-6 text-gray-900">
              Marital Status <span className="text-red-500">*</span>
            </label>
            <div className="mt-2.5">
              <select
                className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="MaritalStatus"
                name="MaritalStatus"
                value={formData.MaritalStatus}
                onChange={handleChange}
                required
              >
                <option value="">--------SELECT---------</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="UnMarried">UnMarried</option>
                <option value="Divorced">Divorced</option>
              </select>
              {errors.MaritalStatus && <p className="text-red-500 text-xs">{errors.MaritalStatus}</p>}
            </div>
          </div>
        </div>
        <div className="flex ">
          <div className="pr-4 w-1/2">
            <label htmlFor="Dob" className="block text-sm font-semibold leading-6 text-gray-900">
              Date Of Birth <span className="text-red-500">*</span>
            </label>
            <div className="mt-2.5">
              <input
                type="date"
                name="Dob"
                id="Dob"
                value={formData.Dob}
                onChange={handleChange}
                className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              {errors.Dob && <p className="text-red-500 text-xs">{errors.Dob}</p>}
            </div>
          </div>
          <div className="w-1/2">
            <label htmlFor="Nationality" className="block text-sm font-semibold leading-6 text-gray-900">
              Nationality <span className="text-red-500">*</span>
            </label>
            <div className="mt-2.5">
              <select
                className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Nationality"
                name="Nationality"
                value={formData.Nationality}
                onChange={handleChange}
                required
              >
                <option value="">--------SELECT---------</option>
                <option value="Indian">Indian</option>
                <option value="NonIndian">Non Indian</option>
              </select>
              {errors.Nationality && <p className="text-red-500 text-xs">{errors.Nationality}</p>}
            </div>
          </div>
        </div>
        <div className="col-span-2 border p-4">
          <h2>
            Select Relative <span className="text-red-500">*</span>
          </h2>
          <div className="flex items-center">
            <input
              type="radio"
              id="Father"
              name="RelatedType"
              value="Father"
              checked={formData.RelatedType === "Father"}
              className="mx-2"
              onChange={handleChange}
            />
            <label htmlFor="Father">Father</label>
            <input
              type="radio"
              id="Mother"
              name="RelatedType"
              value="Mother"
              checked={formData.RelatedType === "Mother"}
              className="mx-2"
              onChange={handleChange}
            />
            <label htmlFor="Mother">Mother</label>
            <input
              type="radio"
              id="Spouse"
              name="RelatedType"
              value="Spouse"
              checked={formData.RelatedType === "Spouse"}
              className="mx-2"
              onChange={handleChange}
            />
            <label htmlFor="Spouse">Spouse</label>
          </div>
          {errors.RelatedType && <p className="text-red-500 text-xs">{errors.RelatedType}</p>}
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 p-5">
            <div>
              <label htmlFor="RelatedFirstName" className="block text-sm font-semibold leading-6 text-gray-900">
                First Name <span className="text-red-500">*</span>
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="RelatedFirstName"
                  id="RelatedFirstName"
                  value={formData.RelatedFirstName}
                  onChange={handleChange}
                  className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
                {errors.RelatedFirstName && <p className="text-red-500 text-xs">{errors.RelatedFirstName}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="RelatedLastName" className="block text-sm font-semibold leading-6 text-gray-900">
                Last Name <span className="text-red-500">*</span>
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="RelatedLastName"
                  id="RelatedLastName"
                  value={formData.RelatedLastName}
                  onChange={handleChange}
                  className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
                {errors.RelatedLastName && <p className="text-red-500 text-xs">{errors.RelatedLastName}</p>}
              </div>
            </div>
          </div>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="Address" className="block text-sm font-semibold leading-6 text-gray-900">
            Address <span className="text-red-500">*</span>
          </label>
          <div className="mt-2.5">
            <textarea
              name="Address"
              id="Address"
              rows={4}
              value={formData.Address}
              onChange={handleChange}
              className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            ></textarea>
            {errors.Address && <p className="text-red-500 text-xs">{errors.Address}</p>}
          </div>
        </div>
        <div className="flex ">
          <div className="pr-4 w-1/2">
            <label htmlFor="City" className="block text-sm font-semibold leading-6 text-gray-900">
              City/Town/Village <span className="text-red-500">*</span>
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="City"
                id="City"
                value={formData.City}
                onChange={handleChange}
                className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              {errors.City && <p className="text-red-500 text-xs">{errors.City}</p>}
            </div>
          </div>
          <div className="w-1/2">
            <label htmlFor="PinCode" className="block text-sm font-semibold leading-6 text-gray-900">
              Pin Code <span className="text-red-500">*</span>
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="PinCode"
                id="PinCode"
                value={formData.PinCode}
                onChange={handleChange}
                className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              {errors.PinCode && <p className="text-red-500 text-xs">{errors.PinCode}</p>}
            </div>
          </div>
        </div>
        <div className="flex ">
          <div className="pr-4 w-1/2">
            <label htmlFor="District" className="block text-sm font-semibold leading-6 text-gray-900">
              District <span className="text-red-500">*</span>
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="District"
                id="District"
                value={formData.District}
                onChange={handleChange}
                className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              {errors.District && <p className="text-red-500 text-xs">{errors.District}</p>}
            </div>
          </div>
          <div className="w-1/2">
            <label htmlFor="State" className="block text-sm font-semibold leading-6 text-gray-900">
              State <span className="text-red-500">*</span>
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="State"
                id="State"
                value={formData.State}
                onChange={handleChange}
                className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              {errors.State && <p className="text-red-500 text-xs">{errors.State}</p>}
            </div>
          </div>
        </div>
        <div className="flex ">
          <div className="w-1/2">
            <label htmlFor="ProductId" className="block text-sm font-semibold leading-6 text-gray-900">
              Product <span className="text-red-500">*</span>
            </label>
            <div className="mt-2.5">
              <select
                className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="ProductId"
                name="ProductId"
                value={formData.ProductId}
                onChange={handleChange}
                required
              >
                <option value="">--------SELECT---------</option>
                {products.map((product: any) => (
                  <option key={product.productId} value={product.productId}>
                    {product.productName} <span>{product.brand.brandName}</span>
                  </option>
                ))}
              </select>
              {errors.ProductId && <p className="text-red-500 text-xs">{errors.ProductId}</p>}
            </div>
          </div>
        </div>
        <div className="flex ">
          <div className="pr-4 w-1/2">
            <label htmlFor="EmailId" className="block text-sm font-semibold leading-6 text-gray-900">
              Email Id <span className="text-red-500">*</span>
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                name="EmailId"
                id="EmailId"
                value={formData.EmailId}
                onChange={handleChange}
                className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              {errors.EmailId && <p className="text-red-500 text-xs">{errors.EmailId}</p>}
            </div>
          </div>
          <div className="w-1/2">
            <label htmlFor="PhoneNumber" className="block text-sm font-semibold leading-6 text-gray-900">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="PhoneNumber"
                id="PhoneNumber"
                value={formData.PhoneNumber}
                onChange={handleChange}
                className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              {errors.PhoneNumber && <p className="text-red-500 text-xs">{errors.PhoneNumber}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
