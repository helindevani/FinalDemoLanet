'use client';
import Head from 'next/head';
// import Header from './constant/layout/header';
// import Sidebar from './constant/layout/sidebar';
import { useState } from 'react';
import axios from 'axios';
import AdminSidebar from '@/components/AdminSidebar';

const ImportBrand = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e : any) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        // const formData = new FormData();
        // formData.append('brandfile', file );
        
        // try {
        //     const response = await axios.post('/api/importBrand', formData, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data'
        //         }
        //     });
        //     console.log(response.data);
        //     showAlert();
        // } catch (error) {
        //     console.error('Error importing brand:', error);
        // }
    };

    const showAlert = () => {
        alert('Success! message sent successfully.');
    };

    return (
      <AdminSidebar>
        <div className="page-wrapper">
          <div className="flex justify-between top-0 bg-white p-3 h-10 mb-10 sm:h-auto w-auto text-sm">
            <h3 className="text-xl text-blue-800 font-semibold text-primary">
              Import Brand
            </h3>
            <nav className="flex items-center space-x-2">
              <a href="#" className="text-gray-400 hover:text-blue-800">
                Home
              </a>
              <span className="text-gray-400">{`>`}</span>
              <span className="text-gray-600">Import brand</span>
            </nav>
          </div>

          <div className="container m-auto">
            <div className="max-w-4xl mx-auto h-screen">
              <div className="bg-white shadow-md rounded px-8 pt-6 pb-15 m-10 w-3/4 h-1/2">
                <form className="space-y-4 px-5 py-8">
                  <div className="flex items-center">
                    <label className="w-1/4 text-gray-700" htmlFor="name">
                      Import brand File
                    </label>
                    <input
                      className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="file"
                    />
                  </div>
                  <div className="flex items-center justify-center pb-8">
                        <a
                          href="assets/import/brand.xlsx"
                          download
                          className='text-blue-500'
                        >
                          Sample file
                        </a>
                      
                  </div>

                  <div className="flex items-center justify-center">
                    <button
                      type="submit"
                      name="create"
                      id="createProductBtn"
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Import
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="bg-gray-100 min-h-screen">
            <Head>
                <title>Import Brand</title>
            </Head>
            {/* <Header />
            <Sidebar /> */}

        {/* <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-bold text-primary">Import Brand</h3>
                    <nav className="breadcrumb">
                        <ol className="list-none p-0 inline-flex">
                            <li className="breadcrumb-item"><a href="#" className="text-blue-500">Home</a></li>
                            <li className="breadcrumb-item active">Import Brand</li>
                        </ol>
                    </nav>
                </div>

                <div className="bg-white shadow-md rounded-md p-6">
                    <form className="form-horizontal" id="submitImportForm" onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="form-group">
                            <div className="row">
                                <label htmlFor="brandfile" className="col-sm-3 control-label">Import Brand File</label>
                                <div className="col-sm-9">
                                    <input type="file" id="brandfile" className="form-control" onChange={handleFileChange} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <label className="col-sm-3 control-label"></label>
                                <div className="col-sm-2">
                                    <a href="assets/import/brand.xlsx" download className="text-blue-500">Sample file</a>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md m-b-30 m-t-30">Import</button>
                    </form>
                </div>
            </div> */}
        {/* <footer className="text-center text-sm text-gray-600 mt-8">
                Author Name- Mayuri K. For any PHP, Codeignitor, Laravel OR Python work contact me at mayuri.infospace@gmail.com Visit website - www.mayurik.com
            </footer> */}
        {/* </div> */}
      </AdminSidebar>
    );
};

export default ImportBrand;
