import { useState } from "react";
import ImagePicker from "../ImagePicker/ImagePicker";

interface changeType{
  onChange : any
}

export default function RequieredDocument({ onChange } : changeType) {
  const [poa,setPoa]=useState();
  const [poi,setPoi]=useState();

  const handleChange = (e : any) => {
    const { name, value } = e.target;
    onChange({ POI: poi, POA: poa,[name]: value}); 
  };
  console.log(poa)
  return (
    <>
      <h1>Documents</h1>
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 p-5">
        <div>
          <label htmlFor="POI" className="w-1/4  text-gray-700 ">
            Proof Of Identity (POI)
          </label>
          <div className="mt-2.5">
            <select
              className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="POIName"
              name="POIName"
              onChange={handleChange}
              required
            >
              <option value="">--------SELECT---------</option>
              <option value="UID">Aadhar Card</option>
              <option value="DL">Driving Licence</option>
              <option value="EC">Voter Id Card</option>
            </select>
          </div>
          <div className="mt-2.5">
            <ImagePicker label="POI" name="POI" onImageChange={setPoi}/>
          </div>
          <label htmlFor="POINo" className="w-1/4  text-gray-700 ">
            Proof Of Identity Number
          </label>
          <div className="mt-2.5">
            <input
              type="text"
              name="POINo"
              id="POINo"
              onChange={handleChange}
              required
              className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          
        </div>
        <div>
          <label htmlFor="POA" className="w-1/4  text-gray-700 ">
            Proof Of Address (POA)
          </label>
          <div className="mt-2.5">
            <select
              className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="POAName"
              name="POAName"
              required
              onChange={handleChange}
            >
              <option value="">--------SELECT---------</option>
              <option value="UID">Aadhar Card</option>
              <option value="DL">Driving Licence</option>
              <option value="EC">Voter Id Card</option>
              <option value="EC">Ration Card</option>
            </select>
          </div>
          <div className="mt-2.5">
            <ImagePicker label="POA" name="POA" onImageChange={setPoa}/>
          </div>
          <label htmlFor="POANo" className="w-1/4  text-gray-700 ">
            Proof Of Address Number 
          </label>
          <div className="mt-2.5">
            <input
              type="text"
              name="POANo"
              id="POANo"
              onChange={handleChange}
              required
              className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          
        </div>
      </div>
    </>
  );
}
