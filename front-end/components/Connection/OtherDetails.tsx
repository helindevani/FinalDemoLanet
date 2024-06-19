'use client';
import ImagePicker from "../ImagePicker/ImagePicker";
import { useState } from "react";

interface changeType{
  onChange : any
}

export default function OtherDetails({onChange} : changeType) {
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [photo,setPhoto]=useState();

  const handleChange = (e : any) => {
    const { name, value } = e.target;
    onChange({ PhotoGraph:photo,[name]: value }); 
  };


  const handleShow = (e :any) => {

    setShowAdditionalFields(true);
  };

  const handleHide = (e :any) => {
    setShowAdditionalFields(false);
  };

  return (
    <>
      <b className="text-2xl">Other Details</b>
      <div className="m-5 border p-5 border-gray-700">
        <b>Piped Natural Gas (PNG) Customer </b>
        <p className="p-5">
          PNG Consumers Are Now Allowed By Govt. of India To Keep One LPG
          Connection In Their HouseHold For Which Supply Would Be At{" "}
          <b>Non-Subsidised Rate</b>. If You Are PNG Customer, Check The Box
          Below.
        </p>
        <p className="py-2 px-5">
          <input
            type="checkbox"
            name="IsPNG"
            value="true"
            onChange={handleChange}
          />{" "}
          Piped Natural gas Customer
        </p>
      </div>

      <div className="m-5 border p-5 border-gray-700">
        <b>Cash Transfer Section <span className="text-red-500">*</span></b>
        <p className="p-5">
          Government Has Launched The <b>GiveItUp</b> Scheme Which Is Aimed
          Which Is aimed at Motivating LPG users who can afford to pay the
          market price for LPG, voluntarily surrender their LPG subsidy.
        </p>
        <p className="py-2 px-5">
          If you To be part of nation-Building exercise{" "}
          <b>do giveup your subsidy,</b> by selecting <b>Yes</b> radio button.
          <br />
          <button onClick={handleHide}>
            <input
              type="radio"
              name="IsGovScheme"
              value="false"
              onChange={handleChange}
            />
          </button>
          <span className="pr-2"> Yes</span>
          <button onClick={handleShow}>
            <input
              type="radio"
              name="IsGovScheme"
              value="true"
              onChange={handleChange}
            />
          </button>{" "}
          No
          <br />
          {showAdditionalFields && (
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 p-5">
              <div className="w-1/2">
                <label
                  htmlFor="RationCardNumber"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Aadhar Card Number <span className="text-red-500">*</span>
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="AadharCardNo"
                    id="AadharCardNo"
                    onChange={handleChange}
                    required
                    className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              </div>
            </div>
          )}
        </p>
      </div>

      <div className="m-5 border p-5 border-gray-700">
        <b>Ration Card <span className="text-red-500">*</span></b>
        <p className="p-5">
          Upload the scan copies of ration document required for cash
          transfer(In case name is appearing in any ration card issued by the
          State Government please provide the card number and the Name of the
          State Government)
        </p>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 p-5">
          <div className="w-1/2">
            <label
              htmlFor="State"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              State <span className="text-red-500">*</span>
            </label>
            <div className="mt-2.5">
              <select
                className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="RationState"
                name="RationState"
                required
                onChange={handleChange}
              >
                <option value="">--------SELECT---------</option>
                <option value="Gujrat">Gujrat</option>
                <option value="UtterPradesh">UtterPradesh</option>
              </select>
            </div>
          </div>
          <div className="w-1/2">
            <label
              htmlFor="RationCardNumber"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Ration Card Number <span className="text-red-500">*</span>
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="RationCardNumber"
                id="RationCardNumber"
                required
                onChange={handleChange}
                className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="m-5">
        <ImagePicker label="Please Enter Your Photograph" name="PhotoGraph" onImageChange={setPhoto}/>
      </div>
    </>
  );
}
