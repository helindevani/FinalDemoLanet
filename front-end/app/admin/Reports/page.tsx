'use client';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const DatewiseReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const token = Cookies.get("token");

  const validate = () => {
    if (!startDate || !endDate) {
      return 'Please select both start date and end date';
    }
    if (new Date(startDate) > new Date(endDate)) {
      return 'Start date must be before end date';
    }
    return '';
  };

  const handleGenerateReport = async (e: any) => {
    e.preventDefault();
    setErrorMessage('');

    const validationError = validate();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    try {
      const response = await axios.get('http://localhost:5057/api/Admin/GenrateReport', {
        params: { startDate, endDate },
        responseType: 'blob',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Report.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        setErrorMessage('Failed to generate report');
      }
    } catch (error) {
      setErrorMessage('An error occurred while generating the report');
    }
  };

  return (
    <div className="page-wrapper">
      <div className="flex justify-between top-0 bg-white p-3 h-10 mb-10 sm:h-auto w-auto text-sm">
        <h3 className="text-xl text-blue-800 font-semibold text-primary">
          DateWise Report
        </h3>
        <nav className="flex items-center space-x-2">
          <a href="#" className="text-gray-400 hover:text-blue-800">
            Home
          </a>
          <span className="text-gray-400">{`>`}</span>
          <span className="text-gray-600">DateWise Report</span>
        </nav>
      </div>

      <div className="container m-auto">
        <div className="max-w-4xl mx-auto h-screen">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-15 m-10 w-3/4 h-1/2">
            <form className="space-y-4 px-5 py-8" onSubmit={handleGenerateReport}>
              <div className="flex items-center">
                <label className="w-1/4 text-gray-700" htmlFor="startDate">
                  Start Date <span className='text-red-500'>*</span>
                </label>
                <input
                  className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="Start Date"
                />
              </div>
              <div className="flex items-center pb-5">
                <label className="w-1/4 text-gray-700" htmlFor="endDate">
                  End Date <span className='text-red-500'>*</span>
                </label>
                <input
                  className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  placeholder="End Date"
                />
              </div>

              {errorMessage && (
                <div className="text-red-500 text-sm">
                  {errorMessage}
                </div>
              )}

              <div className="flex items-center justify-start">
                <button
                  type="submit"
                  name="create"
                  id="createProductBtn"
                  className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Generate Report
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatewiseReport;
