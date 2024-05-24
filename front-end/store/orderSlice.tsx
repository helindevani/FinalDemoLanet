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
  address: string;
  amount: string;
  booking: Booking; 
  bookingId: string;
  clientContact: string;
  clientEmail: string;
  clientName: string;
  createDate: string; 
  createdBy: string;
  isStaffAccepted: boolean | null;
  lpgNo: string;
  orderId: string;
  orderStatus: number;
  orderDate: string; 
  paymentStatus: number;
  paymentType: number;
  staff: Staff;
  staffId: string;
  updateDate: string; 
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

export const fetchOrdersAdmin = createAsyncThunk<Order[],boolean>(
  "order/fetchOrdersAdmin",
  async (history) => {
    const token = getToken();
    const response = await axios.get<Order[]>(`${apiUrl}?history=${history}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

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

export const deleteOrder = createAsyncThunk<string, string>(
  "order/deleteOrder",
  async (orderId) => {
    const token = getToken();
    const response = await axios.delete(`${apiUrl}/${orderId}`, {
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
  } as OrderState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchOrdersAdmin.fulfilled, (state, action) => {
      state.orders = action.payload;
    })
      .addCase(fetchOrdersStaff.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(staffActionOrder.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        const index = state.orders.findIndex(
          (order) => order.orderId === action.meta.arg.orderId
        );
        if (index !== -1) {
          state.orders[index] = {
            ...state.orders[index],
            ...action.payload,
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
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(
          (order) => order.orderId !== action.payload
        );
      });
  },
});

export default orderSlice.reducer;
