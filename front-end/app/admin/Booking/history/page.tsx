'use client';
import AdminSidebar from '@/components/AdminSidebar';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookings } from '@/store/bookingSlice';
import Link from 'next/link';
import { FaEye } from 'react-icons/fa';

const BookingHistory = () => {
  const dispatch= useDispatch<any>();
  const bookings:any = useSelector(
    (state: any) => state.booking.bookings
  );
  const token= Cookies.get('token');

  useEffect(() =>  {
    return () => dispatch(fetchBookings(true));
  }, [dispatch,token]);


  const getPaymentStatus = (value: number): string => {
    switch (value) {
      case 0:
        return "Pending";
      case 1:
        return "Success";
      case 2:
        return "Failed";
      default:
        return "";
    }
  };

  const getPaymentMode = (value: number): string => {
    switch (value) {
      case 0:
        return "Online";
      case 1:
        return "CashOnDelivery";
      default:
        return "";
    }
  };

  
  const getBookingStatus = (value: number): string => {
    switch (value) {
      case 0:
        return "Pending";
      case 1:
        return "Confirmed";
        case 2:
        return "Rejected";
      default:
        return "";
    }
  };

  function convertToLocalDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0'); 
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear(); 
    return `${day}-${month}-${year}`;
  }

    return (
      <AdminSidebar>
      <div className="page-wrapper  overflow-scroll">
        <div className="sticky flex justify-between top-0 bg-white p-3 h-10 mb-10 sm:h-auto w-auto text-sm">
          <h3 className="text-xl text-blue-800 font-semibold text-primary">
            Booking History
          </h3>
          <nav className="flex items-center space-x-2">
            <a href="#" className="text-gray-400 hover:text-blue-800">
              Home
            </a>
            <span className="text-gray-400">{`>`}</span>
            <span className="text-gray-600">BookingDetails</span>
          </nav>
        </div>

        <div className="container m-auto h-screen">
          <div className="w-auto">
            <div className="bg-white shadow-md rounded px-8 pt-14 pb-15 m-10 w-auto h-auto ">
              <div className="flex justify-between items-center">
                <div className="dataTables_length">
                  <label className="mr-3">
                    Show{" "}
                    <select
                      name="myTable_length"
                      aria-controls="myTable"
                      className="form-select border-b-2 border-gray-500 focus:border-blue-700 shadow-md"
                    >
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>{" "}
                    entries
                  </label>
                </div>
                <div id="myTable_filter" className="dataTables_filter">
                  <label className="flex items-center">
                    <span className="mr-1">Search:</span>
                    <input
                      type="search"
                      className="border-b-2 border-gray-500 focus:border-blue-700 shadow-md"
                      placeholder=""
                      aria-controls="myTable"
                    />
                  </label>
                </div>
              </div>

              <div className="table-responsive justify-between mt-3">
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300">
                  <thead className="bg-white">
                    <tr>
                      <th className="p-3 border border-b border-gray-300 text-gray-700">
                        #
                      </th>
                      <th className="p-3 border border-b border-gray-300 text-gray-700">
                        LPG No
                      </th>
                      <th className="p-3 border border-b border-gray-300 text-gray-700">
                        Booking Date
                      </th>
                      <th className="p-3 border border-b border-gray-300 text-gray-700">
                        Product
                      </th>
                      <th className="p-3 border border-b border-gray-300 text-gray-700">
                        Price
                      </th>
                      <th className="p-3 border border-b border-gray-300 text-gray-700">
                        Payment Type
                      </th>
                      <th className="p-3 border border-b border-gray-300 text-gray-700">
                        Payment Status
                      </th>
                      <th className="p-3 border border-b border-gray-300 text-gray-700">
                        Booking Status
                      </th>
                      <th className="p-3 border border-b border-gray-300 text-gray-700">
                        View Details
                      </th>

                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking: any, index : any) => ( 
                      <tr
                        key={booking.bookingId}
                        className="border-b border border-gray-300 bg-gray-100"
                      >
                        <td className="p-3 border border-b border-gray-300 text-center">
                          {index + 1}
                        </td>
                        <td className="p-3 border border-b border-gray-300 text-center">
                         {booking.lpgNo}
                        </td>
                        <td className="p-3 border border-b border-gray-300 text-center">
                        {convertToLocalDate(booking.bookingDate)}
                        </td>
                        <td className="p-3 border border-b border-gray-300 text-center">
                          {booking.product.productName} {booking.product.brand.brandName}
                        </td>
                        <td className="p-3 border border-b border-gray-300 text-center">
                          {booking.price}
                        </td>
                        <td className="p-3 border border-b border-gray-300 text-center">
                          {getPaymentMode(booking.paymentType)}
                        </td>
                        <td className="p-3  border border-b border-gray-300 text-center">
                          {getPaymentStatus(booking.paymentStatus)}
                        </td>
                        <td className="p-3  border border-b border-gray-300 text-center">
                          {getBookingStatus(booking.status)}
                        </td>
                        <td className="p-3   border-gray-300 flex justify-center text-center">
                          <div className="m-1">
                            <Link
                              href={`/admin/booking/history/${booking.bookingId}`}
                              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-2 rounded flex items-center"
                            >
                              <FaEye />
                            </Link>
                          </div>
                          </td>
                      </tr>
                     ))}
                  </tbody>
                </table>
                </div>
                <div className="flex justify-between items-center">
                  <div>Showing 1 Of 1 Entries</div>
                  <div className="flex p-3">
                    <div className="flex-1 text-gray-500 border p-2 justify-between items-center w-18 h-10">Previous</div>
                    <div className="flex-1 border text-center text-white p-2 bg-blue-600 justify-between items-center w-20 h-10">1</div>
                    <div className="flex-1 text-gray-500 border p-2 justify-between items-center w-18 h-10">Next</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminSidebar>
    );
};

export default BookingHistory;
