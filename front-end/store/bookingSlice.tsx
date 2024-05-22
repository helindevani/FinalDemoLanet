import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

interface Booking {
  bookingDate: string;
  bookingId: string;
  consumerName: string;
  createDate: string;
  createdBy: string;
  emailId: string;
  lpgNo: string;
  paymentDate: string;
  paymentId: string;
  paymentStatus: number;
  paymentType: number;
  phoneNumber: string;
  price: string;
  product: any; 
  productID: string;
  shippingAddress: string;
  status: number;
  updateDate: string;
}

const apiBooking = 'http://localhost:5057/api/Bookings';

const getToken = () => Cookies.get('token');

export const deleteBooking = createAsyncThunk<string, string>(
    'booking/deleteBooking',
    async (bookingId) => {
      const token = getToken();
      const response=await axios.delete(`${apiBooking}/${bookingId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return bookingId;
    }
  );

  export const fetchBookings = createAsyncThunk<Booking[], boolean>(
    'Booking/fetchBookings',
    async (history: boolean) => {
      const token = getToken();
      const response = await axios.get<any>(`${apiBooking}?history=${history}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    }
  );
  const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
      bookings: [] as any,
    } as any,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchBookings.fulfilled, (state, action) => {
          state.bookings = action.payload;
        })
        .addCase(deleteBooking.fulfilled, (state, action) => {
          state.bookings = state.bookings.filter(
            (booking : any) => booking.bookingId !== action.payload
          );
        });
    },
  });
  
  export default bookingSlice.reducer;