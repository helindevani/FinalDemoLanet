import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

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

  export const fetchBookings = createAsyncThunk<any>(
    'Booking/fetchBookings',
    async () => {
      const token = getToken();
      const response = await axios.get<any>(apiBooking, {
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