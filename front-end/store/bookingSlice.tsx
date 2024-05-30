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

interface BookingState {
  bookings: Booking[];
  totalCount: number;
  page: number;
  pageSize: number;
}

const apiBooking = 'http://localhost:5057/api/Bookings';

const getToken = () => Cookies.get('token');

export const deleteBooking = createAsyncThunk<string, string>(
  'booking/deleteBooking',
  async (bookingId) => {
    const token = getToken();
    await axios.delete(`${apiBooking}/${bookingId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return bookingId;
  }
);

export const fetchBookings = createAsyncThunk<
  { data: Booking[]; totalCount: number },
  { page: number; pageSize: number; history: boolean ; search?: string}
>(
  'booking/fetchBookings',
  async ({ page, pageSize, history,search="" }) => {
    const token = getToken();
    const response = await axios.get<{
      pagedBookings: Booking[];
      totalBookings: number;
    }>(
      `${apiBooking}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        params: { page, pageSize, history ,search},
      }
    );
    return {
      data: response.data.pagedBookings,
      totalCount: response.data.totalBookings,
    };
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookings: [] as Booking[],
    totalCount: 0,
    page: 1,
    pageSize: 5,
  } as BookingState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.bookings = action.payload.data;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter(
          (booking) => booking.bookingId !== action.payload
        );
      });
  },
});

export const { setPage, setPageSize } = bookingSlice.actions;

export default bookingSlice.reducer;
