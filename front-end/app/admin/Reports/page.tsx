'use client';
import { useState } from 'react';

import AdminSidebar from '@/components/Sidebar/AdminSidebar';

const DatewiseReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleGenerateReport = async (e:any) => {
    e.preventDefault();

    
  };

  return (
    <AdminSidebar>
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
                <form className="space-y-4 px-5 py-8">
                  <div className="flex items-center">
                    <label className="w-1/4 text-gray-700" htmlFor="startDate">
                      Start Date
                    </label>
                    <input
                      className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="startDate"
                      type="date"
                      placeholder="Start Name"
                    />
                  </div>
                  <div className="flex items-center pb-5">
                    <label className="w-1/4 text-gray-700" htmlFor="endDate">
                      End Date
                    </label>
                    <input
                      className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="endDate"
                      type="date"
                      placeholder="End Name"
                    />
                  </div>
                  
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
{/*         
            <footer className="text-center text-sm text-gray-600 mt-8">
                Author Name- Mayuri K. For any PHP, Codeignitor, Laravel OR Python work contact me at mayuri.infospace@gmail.com Visit website - www.mayurik.com
            </footer> */}
       
        </AdminSidebar>
  );
};

export default DatewiseReport;
