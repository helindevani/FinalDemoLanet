import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

type AppDispatch = (arg: any) => any;

export type Order = {
  address: string;
  amount: string;
  booking: any; // You might want to replace 'any' with a specific type if you know the structure of booking
  bookingId: string;
  clientContact: string;
  clientEmail: string;
  clientName: string;
  createDate: string; // Consider using Date type if you're parsing it to a Date object
  createdBy: string;
  isStaffAccepted: boolean | null;
  lpgNo: string;
  orderId: string;
  orderStatus: number;
  orderdate: string; // Consider using Date type if you're parsing it to a Date object
  paymentStatus: number;
  paymentType: number;
  staff: any; // You might want to replace 'any' with a specific type if you know the structure of staff
  staffId: string;
  updateDate: string; // Consider using Date type if you're parsing it to a Date object
  updatedBy: string;
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
}

const apiUrl = "http://localhost:5057/api/Orders";

const getToken = () => Cookies.get("token");

export const fetchOrdersStaff = createAsyncThunk<Order[]>(
  "order/fetchOrdersStaff",
  async () => {
    const token = getToken();
    const response = await axios.get<Order[]>(apiUrl + "/Staff", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const staffActionOrder = createAsyncThunk<Order, { orderId: string, status: boolean }>(
    "order/staffActionOrder",
    async ({ orderId, status }) => {
      const token = getToken();
      const response = await axios.post<Order>(`${apiUrl}/${orderId}`, null, {
        params: { status },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    }
  );

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
export const addCategory = createAsyncThunk<Order, Order>(
  "category/addCategory",
  async (inputData) => {
    const token = getToken();
    const response = await axios.post<Order>(apiUrl, inputData, {
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

export const deleteCategory = createAsyncThunk<string, string>(
  "category/deleteCategory",
  async (categoryId) => {
    const token = getToken();
    const response = await axios.delete(`${apiUrl}/${categoryId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return categoryId;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [] as Order[],
    selectedOrder: null, 
  } as OrderState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersStaff.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(staffActionOrder.fulfilled, (state, action) => {
        const index = state.orders.findIndex(
          (order) => order.orderId === action.meta.arg.orderId
        );
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.selectedOrder = action.payload; // Update selectedOrder state with the fetched order
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload); // Add the new order to the orders array
      })
      .addCase(addCategory.fulfilled, (state, action) => {
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
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.orders = state.orders.filter(
          (order) => order.orderId !== action.payload
        );
      });
  },
});

export default orderSlice.reducer;
