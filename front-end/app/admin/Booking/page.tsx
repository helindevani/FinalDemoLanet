'use client';
import AdminSidebar from '@/components/AdminSidebar';
import { useEffect, useCallback, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBooking, fetchBookings, setPage, setPageSize } from '@/store/bookingSlice';
import debounce from 'lodash.debounce';

const BookingDetails = () => {
  const dispatch = useDispatch<any>();
  const { bookings, totalCount, page, pageSize } = useSelector((state: any) => state.booking);
  const token = Cookies.get('token');
  const [search, setSearch] = useState("");

  const fetchData = useCallback(
    debounce((page, pageSize,search) => {
      dispatch(fetchBookings({ page, pageSize ,history:false,search}));
    }, 1500),
    [dispatch]
  );

  useEffect(() => {
    fetchData(page, pageSize,search);
  }, [dispatch, token, page, pageSize, fetchData,search]);

  const totalPages = Math.ceil(totalCount / pageSize);

  const handleDeleteBooking = (bookingID: string) => {
    if (window.confirm("Are you sure to delete this booking?")) {
      dispatch(deleteBooking(bookingID))
    }
  };

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

  function convertToLocalDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  return (
    <AdminSidebar>
      <div className="page-wrapper overflow-scroll">
        <div className="sticky flex justify-between top-0 bg-white p-3 h-10 mb-10 sm:h-auto w-auto text-sm">
          <h3 className="text-xl text-blue-800 font-semibold text-primary">
            Booking Details
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
                      value={pageSize}
                      onChange={(e) => dispatch(setPageSize(Number(e.target.value)))}
                      className="form-select border-b-2 border-gray-500 focus:border-blue-700 shadow-md"
                    >
                      <option value="5">5</option>
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
                      value={search}
                      onChange={(e)=>(setSearch(e.target.value))}
                    />
                  </label>
                </div>
              </div>

              <div className="table-responsive justify-between mt-3">
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-300">
                    <thead className="bg-white">
                      <tr>
                        <th className="p-3 border border-b border-gray-300 text-gray-700">#</th>
                        <th className="p-3 border border-b border-gray-300 text-gray-700">LPG No</th>
                        <th className="p-3 border border-b border-gray-300 text-gray-700">Booking Date</th>
                        <th className="p-3 border border-b border-gray-300 text-gray-700">Product</th>
                        <th className="p-3 border border-b border-gray-300 text-gray-700">Price</th>
                        <th className="p-3 border border-b border-gray-300 text-gray-700">Payment Type</th>
                        <th className="p-3 border border-b border-gray-300 text-gray-700">Payment Status</th>
                        <th className="p-3 border border-b border-gray-300 text-gray-700">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking: any, index: any) => (
                        <tr key={booking.bookingId} className="border-b border border-gray-300 bg-gray-100">
                          <td className="p-3 border border-b border-gray-300 text-center">{index + 1}</td>
                          <td className="p-3 border border-b border-gray-300 text-center">{booking.lpgNo}</td>
                          <td className="p-3 border border-b border-gray-300 text-center">{convertToLocalDate(booking.bookingDate)}</td>
                          <td className="p-3 border border-b border-gray-300 text-center">
                            {booking.product.productName} {booking.product.brand.brandName}
                          </td>
                          <td className="p-3 border border-b border-gray-300 text-center">{booking.price}</td>
                          <td className="p-3 border border-b border-gray-300 text-center">{getPaymentMode(booking.paymentType)}</td>
                          <td className="p-3 border border-b border-gray-300 text-center">{getPaymentStatus(booking.paymentStatus)}</td>
                          <td className="p-3 border-gray-300 flex justify-end text-center">
                            <div className="m-1">
                              <Link href="/admin/booking/order" className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-2 rounded flex items-center">
                                <FaEdit />
                              </Link>
                            </div>
                            <div className="m-1">
                              <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded flex items-center"
                                onClick={() => handleDeleteBooking(booking.bookingId)}
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div>Showing {page} of {totalPages} Entries</div>
                  <div className="flex p-3">
                    <button
                      className="flex-1 text-gray-500 border p-2 justify-between items-center w-18 h-10"
                      disabled={page <= 1}
                      onClick={() => dispatch(setPage(page - 1))}
                    >
                      Previous
                    </button>
                    <div className="flex-1 border text-center text-white p-2 bg-blue-600 justify-between items-center w-20 h-10">
                      {page}
                    </div>
                    <button
                      className="flex-1 text-gray-500 border p-2 justify-between items-center w-18 h-10"
                      disabled={page >= totalPages}
                      onClick={() => dispatch(setPage(page + 1))}
                    >
                      Next
                    </button>
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

export default BookingDetails;
