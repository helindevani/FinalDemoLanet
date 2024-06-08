// store/connectionSlice.js
import { ConnectionDetails } from '@/components/TypeInterface/AllType';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

interface ConnectionState {
  connections:ConnectionDetails [];
  totalCount: number;
  page: number;
  pageSize: number;
  selectedConnection:any;
}

export const fetchConnections = createAsyncThunk<
{ data:any; totalCount: any },
{ status:string,page: number; pageSize: number; search?: string },
{ state: any }
>('connection/fetchConnections', async ({ status, page, pageSize, search }) => {
  const token = Cookies.get('token');
  const response = await axios.get(`http://localhost:5057/api/Connections/status`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    params: {status, page, pageSize, search },
  });
  return {
    data: response.data.pagedConnections,
    totalCount: response.data.totalConnections,
  };
});

export const fetchConnectionById = createAsyncThunk<any, string>(
  "connection/fetchConnectionById",
  async (lpgNo) => {
    const token = Cookies.get('token');
    const response = await axios.get(`http://localhost:5057/api/Connections/${lpgNo}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const deleteConnection = createAsyncThunk<string, string>(
  "connection/deleteConnection",
  async (lpgNo) => {
    const token = Cookies.get('token');
    await axios.delete(`http://localhost:5057/api/Connections/${lpgNo}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return lpgNo;
  }
);

const connectionSlice = createSlice({
  name: 'connection',
  initialState: {
    connections: [] as ConnectionDetails[],
    totalCount: 0,
    page: 1,
    pageSize: 5,
    selectedConnection: null, 
  }as ConnectionState,
  reducers: {
    setPage: (state, action) => {
        state.page = action.payload;
      },
      setPageSize: (state, action) => {
        state.pageSize = action.payload;
      },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConnections.fulfilled, (state, action) => {
      state.connections = action.payload.data;
      state.totalCount = action.payload.totalCount;
    })
    .addCase(fetchConnectionById.fulfilled, (state, action) => {
      state.selectedConnection = action.payload;
    })
    .addCase(deleteConnection.fulfilled, (state, action) => {
      state.connections = state.connections.filter(
        (connection) => connection.lpgNo !== action.payload
      );
    });
  },
});

export const { setPage, setPageSize } = connectionSlice.actions;
export default connectionSlice.reducer;
