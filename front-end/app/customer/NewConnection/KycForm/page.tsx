"use client";
import { useState } from "react";
import Declaration from "../../../../components/Connection/Declaration";
import OtherDetails from "../../../../components/Connection/OtherDetails";
import PersonalDetails from "../../../../components/Connection/PersonalDetails";
import RequieredDocument from "../../../../components/Connection/RequieredDocument";
import Sidebar from "@/components/Sidebar/Sidebar";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastError, ToastSuccess } from "@/components/ToastError";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

interface FormData {
  FirstName: string;
  LastName: string;
  Gender: string;
  MaritalStatus: string;
  Dob: string;
  Nationality: string;
  RelatedType: string;
  RelatedFirstName: string;
  RelatedLastName: string;
  Address: string;
  District: string;
  State: string;
  PinCode: string;
  ProductId: string;
  EmailId: string;
  PhoneNumber: string;
  POIName: string;
  POINo: string;
  POI: any; // Change 'any' to the appropriate type if you have one
  POAName: string;
  POANo: string;
  POA: any; // Change 'any' to the appropriate type if you have one
  PhotoGraph: any; // Change 'any' to the appropriate type if you have one
  IsPNG: boolean;
  IsGovScheme: boolean;
  AadharCardNo: string;
  RationState: string;
  RationCardNumber: string;
  IsDeclarationAccept: boolean;
  UserId: string;
}

export default function Connection() {
  const [step, setStep] = useState(1);
  const [submissionSuccessful, setSubmissionSuccessful] = useState(false);
  const router=useRouter();
  const [formData, setFormData] = useState<any>({
    FirstName: "",
    LastName: "",
    Gender: "",
    MaritalStatus: "",
    Dob: "",
    Nationality: "",
    RelatedType: "",
    RelatedFirstName: "",
    RelatedLastName: "",
    Address: "",
    District: "",
    State: "",
    PinCode: "",
    ProductId: "",
    EmailId: "",
    PhoneNumber: "",
    POIName: "",
    POINo: "",
    POI: null,
    POAName: "",
    POANo: "",
    POA: null,
    PhotoGraph: null,
    IsPNG: false,
    IsGovScheme: false,
    AadharCardNo: "",
    RationState: "",
    RationCardNumber: "",
    IsDeclarationAccept: false,
    UserId: "",
  });

  const steps = [
    { name: "Personal Details", status: step > 1 ? "completed" : "active" },
    { name: "Required Documents", status: step > 2 ? "completed" : step === 2 ? "active" : "upcoming" },
    { name: "Other Details", status: step > 3 ? "completed" : step === 3 ? "active" : "upcoming" },
    { name: "Declaration", status: submissionSuccessful ? "completed" : step === 4 ? "active" : "upcoming" },
  ];

  const handleFormChange: any = (data: any) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
  };

  const renderComponent = () => {
    switch (step) {
      case 1:
        return <PersonalDetails onChange={handleFormChange} />;
      case 2:
        return <RequieredDocument onChange={handleFormChange} />;
      case 3:
        return <OtherDetails onChange={handleFormChange} />;
      case 4:
        return <Declaration onChange={handleFormChange} />;
      default:
        return null;
    }
  };

  const handleNext = () => {
    const requiredFieldsMap: any = {
      1: [
        "FirstName",
        "LastName",
        "Gender",
        "MaritalStatus",
        "Dob",
        "Nationality",
        "RelatedType",
        "RelatedFirstName",
        "RelatedLastName",
        "Address",
        "City",
        "PinCode",
        "District",
        "State",
        "ProductId",
        "EmailId",
        "PhoneNumber",
      ],
      2: ["POIName", "POINo", "POI", "POAName", "POANo", "POA"],
      3: ["RationState", "RationCardNumber"],
    };
    const requiredFields: any = requiredFieldsMap[step];
    const isAnyFieldEmpty: boolean = requiredFields
      ? requiredFields.some((field: any) => !formData[field])
      : false;
    if (!isAnyFieldEmpty && step < 4) {
      setStep(step + 1);
    } else {
      ToastError("Please fill out all required fields");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const token = Cookies.get("token");

    if (!token) {
      console.error("JWT token not found");
      return;
    }

    const decodedToken = JSON.parse(atob(token.split(".")[1]));

    const userId = decodedToken ? decodedToken.sub : null;

    formData.UserId = userId;

    if (formData.IsDeclarationAccept) {
      try {
        const formDataToSend = new FormData();
        for (const [key, value] of Object.entries(formData)) {
          if (value instanceof File) {
            formDataToSend.append(key, value);
          } else if (value !== null && typeof value !== "undefined") {
            formDataToSend.append(key, String(value));
          }
        }

        const response = await axios.post(
          "http://localhost:5057/api/Connections",
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 201) {
          ToastSuccess("Your Request Added");
          setSubmissionSuccessful(true);
          router.push('/customer');
        } else {
          console.error("Unexpected response status:", response.status);
          ToastError("Unexpected response from server");
        }
      } catch (error: any) {
        console.error("Error submitting form:", error.message);
        ToastError("Please Provide Valid Data");
      }
    } else {
      ToastError("Accept The Declaration Term And Conditions");
    }
  };

  return (
    <>
      <>
        <ToastContainer />
        <div className="page-wrapper">
          <div className="sticky flex justify-between top-0 bg-white p-3 h-10 mb-10 sm:h-auto w-auto text-sm z-30 border">
            <h3 className="text-xl text-blue-800 font-semibold text-primary">
              KYC (Know Your Consumer) Details
            </h3>
            <nav className="flex items-center space-x-2">
              <a href="#" className="text-gray-400 hover:text-blue-800">
                Home
              </a>
              <span className="text-gray-400">{`>`}</span>
              <span className="text-gray-600">Connection</span>
              <span className="text-gray-400">{`>`}</span>
              <span className="text-gray-600">KycForm</span>
            </nav>
          </div>

          <div className="container m-auto ">
            <div className="w-auto">
              <div className="bg-white shadow-md rounded px-8 pt-14 pb-15 m-10 w-auto h-auto">
                <div className="relative flex items-center justify-center space-x-6 m-10">

                     <ul className="flex justify-between items-center w-full relative">
                {steps.map((step, index) => (
                  <li key={index} className="flex-1 text-center relative">
                    <div className="relative flex items-center justify-center">
                      {index !== 0 && (
                        <div
                          className={`absolute left-0 w-1/2 h-0.5 ${
                            steps[index - 1].status === "completed"
                              ? "bg-green-500"
                              : "bg-slate-200"
                          } transform -translate-y-1/2`}
                        ></div>
                      )}
                      {/* Line after the bullet */}
                      {index !== steps.length - 1 && (
                        <div
                          className={`absolute right-0 w-1/2 h-0.5 ${
                            step.status === "completed"
                              ? "bg-green-500"
                              : "bg-slate-200"
                          } transform -translate-y-1/2`}
                        ></div>
                      )}
                      {/* Bullet */}
                      <div
                        className={`relative w-10 h-10 rounded-full ${
                          step.status === "completed"
                            ? "bg-green-500"
                            : "bg-slate-200"
                        } flex items-center justify-center`}
                      >
                        {step.status === "completed" && (
                          <span className="text-white text-xl">&#x2713;</span>
                        )}
                      </div>
                    </div>
                    <span className="block text-xs md:text-xs mt-2">{step.name}</span>
                  </li>
                ))}
              </ul>
                  {/* </div> */}
                  {/* <span className="absolute h-[2px] bg-black w-80 top-5 left-[233px]"></span> */}
                </div>
                {renderComponent()}

                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 p-5">
                  <div className="flex">
                    <div className="w-1/2 mx-5">
                      {1 < step && step < 5 && (
                        <button
                          onClick={handleBack}
                          className="block w-full rounded-md bg-orange-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Previeos
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-1/2 mx-5">
                      {step < 4 && (
                        <button
                          onClick={handleNext}
                          className="block w-full rounded-md bg-orange-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Save & Next
                        </button>
                      )}
                      {step == 4 && (
                        <button
                          onClick={handleSubmit}
                          className="block w-full rounded-md bg-orange-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Submit
                        </button>
                      )}
                    </div>
                    <div className="w-1/2 mx-5">
                      {!(step == 4) && (
                        <button className="block w-full rounded-md bg-orange-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                          Reset
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
