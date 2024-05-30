import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

type AppDispatch = (arg: any) => any;

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

interface Staff {
  aadharCardNo: string;
  address: string;
  createdBy: string;
  createdDate: string;
  emailId: string;
  gender: string;
  joiningDate: string;
  phoneNumber: string;
  staffId: string;
  staffName: string;
  status: number;
  updatedDate: string;
}

export type Order = {
  orderId: string;
  lpgNo: string;
  clientName: string;
  clientContact: string;
  clientEmail: string;
  staffId: string;
  bookingId: string;
  amount: string;
  paymentType: number;
  paymentStatus: number;
  createdBy: string;
  address: string;
  productId: string;
  orderStatus: number;
  isStaffAccepted: boolean | null;
  createDate: string;
  updateDate: string;
  updatedBy: string;
  deliveryDate: any | null;
  staff: any | null;
  booking: Booking;
  orderDate: any;
};

export type OrderDTO = {
  clientName: string;
  clientEmail: string;
  clientContact: string;
  bookingId: string;
  amount: string;
  lpgNo: string;
  paymentType: number;
  paymentStatus: number;
  address: string;
  staffId: string;
};

interface OrderState {
  orders: Order[];
  selectedOrder: Order | null;
  totalCount: number;
  page: number;
  pageSize: number;
}

const apiUrl = "http://localhost:5057/api/Orders";

const getToken = () => Cookies.get("token");

export const fetchOrdersAdmin = createAsyncThunk<
  { data: Order[]; totalCount: number },
  { page: number; pageSize: number; history: boolean ;search?: string}
>("order/fetchOrdersAdmin", async ({ page, pageSize, history,search = "" }) => {
  const token = getToken();
  const response = await axios.get<{
    pagedOrders: Order[];
    totalOrders: number;
  }>(
    `${apiUrl}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: { page, pageSize, history ,search},
    }
  );
  return {
    data: response.data.pagedOrders,
    totalCount: response.data.totalOrders,
  };
});

export const fetchOrdersStaff = createAsyncThunk<
  { data: Order[]; totalCount: number },
  { page: number; pageSize: number; history: boolean ;search?: string }
>("order/fetchOrdersStaff", async ({ page, pageSize, history ,search = "" }) => {
  const token = getToken();
  const response = await axios.get<{
    pagedOrders: Order[];
    totalOrders: number;
  }>(
    `${apiUrl}/Staff`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: { page, pageSize, history ,search},
    }
  );
  return {
    data: response.data.pagedOrders,
    totalCount: response.data.totalOrders,
  };
});

export const staffActionOrder = createAsyncThunk<
  Order,
  { orderId: string; status: boolean }
>("order/staffActionOrder", async ({ orderId, status }) => {
  const token = getToken();
  const response = await axios.post<Order>(`${apiUrl}/${orderId}`, null, {
    params: { status },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const fetchOrderById = createAsyncThunk<Order, string>(
  "order/fetchOrderById",
  async (orderId) => {
    const token = getToken();
    const response = await axios.get<Order>(`${apiUrl}/${orderId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const postOrder = createAsyncThunk<Order, OrderDTO>(
  "order/postOrder",
  async (orderDTO) => {
    const token = getToken();
    const response = await axios.post<Order>(apiUrl, orderDTO, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const updateOrder = createAsyncThunk<
  Order,
  { orderId: string; data: Order }
>("order/updateOrder", async ({ orderId, data }) => {
  const token = getToken();
  const response = await axios.put<Order>(`${apiUrl}/${orderId}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const deleteOrder = createAsyncThunk<string, string>(
  "order/deleteOrder",
  async (orderId) => {
    const token = getToken();
    await axios.delete(`${apiUrl}/${orderId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return orderId;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [] as Order[],
    selectedOrder: null,
    totalCount: 0,
    page: 1,
    pageSize: 5,
  } as OrderState,
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
      .addCase(fetchOrdersAdmin.fulfilled, (state, action) => {
        state.orders = action.payload.data;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchOrdersStaff.fulfilled, (state, action) => {
        state.orders = action.payload.data;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(staffActionOrder.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        const index = state.orders.findIndex(
          (order) => order.orderId === action.meta.arg.orderId
        );
        if (index !== -1) {
          state.orders[index] = {
            ...state.orders[index],
            ...updatedOrder,
            isStaffAccepted: action.meta.arg.status,
          };
        }
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.selectedOrder = action.payload;
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        const index = state.orders.findIndex(
          (order) => order.orderId === action.payload.orderId
        );
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(
          (order) => order.orderId !== action.payload
        );
      });
  },
});

export const { setPage, setPageSize } = orderSlice.actions;

export default orderSlice.reducer;
