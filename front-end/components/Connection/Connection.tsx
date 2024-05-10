'use client';
import { useState } from "react";
import Declaration from "./Declaration";
import OtherDetails from "./OtherDetails";
import PersonalDetails from "./PersonalDetails";
import RequieredDocument from "./RequieredDocument";

export default function Connection(){
  const [step, setStep]= useState(1);

  const renderComponent = () => {
    switch (step) {
      case 1:
        return <PersonalDetails />;
      case 2:
        return <RequieredDocument />;
      case 3:
        return <OtherDetails />;
      case 4:
        return <Declaration />;
      default:
        return null;
    }
  }

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
    
    return (
      <>
        <div>
          <b className="text-4xl">KYC (Know Your Customer) Details</b>
        </div>
        <div className="relative flex items-center justify-center space-x-6 m-10">
          <div className="relative flex flex-col items-center">
            <button className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center focus:outline-none">
              1
            </button>
            <div className="mt-1">Personal Details</div>
          </div>
          <div className="relative flex flex-col items-center">
            <button className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center focus:outline-none">
              2
            </button>
            <div className="mt-1">Documents</div>
          </div>
          <div className="relative flex flex-col items-center">
            <button className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center focus:outline-none">
              3
            </button>
            <div className="mt-1">Other Details</div>
          </div>
          <div className="relative flex flex-col items-center">
            <button className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center focus:outline-none">
              4
            </button>
            <div className="mt-1">Declaration</div>
          </div>
          <span className="absolute h-[2px] bg-black w-80 top-5 left-[400px] -z-10"></span>

        </div>
        {renderComponent()}

        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 p-5">
        <div className="flex">
        <div className="w-1/2 mx-5">
        {1< step && step <4 &&<button onClick={handleBack} className="block w-full rounded-md bg-orange-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Previeos
          </button>
        }
        </div>
        </div>
        <div className="flex">
          <div className="w-1/2 mx-5">
            {step<4 &&<button onClick={handleNext} className="block w-full rounded-md bg-orange-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Save & Next
            </button>
          
            }
             {step==4 &&<button onClick={handleNext} className="block w-full rounded-md bg-orange-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Submit
            </button>
          
            }

          </div>
          <div className="w-1/2 mx-5">
            {!(step==4) && <button className="block w-full rounded-md bg-orange-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Reset
            </button>
}
          </div>
        </div>
      </div>
      </>
    );
}
