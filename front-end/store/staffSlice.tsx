import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

type AppDispatch = (arg: any) => any;

export type Staff = {
  staffId: string;
  staffName: string;
  aadharCardNo: string;
  gender: string;
  phoneNumber: string;
  joiningDate: Date;
  status: number;
  address: string;
  createdBy: string;
};

interface StaffState {
  staffs: Staff[];
  totalCount: number;
  page: number;
  pageSize: number;
}

const apiUrl = "http://localhost:5057/api/Staffs";

const getToken = () => Cookies.get("token");

export const fetchStaffs = createAsyncThunk<
  { data: Staff[]; totalCount: any },
  { page: number; pageSize: number; search?: string },
  { state: any }
>(
  "staff/fetchStaffs",
  async (
    {
      page,
      pageSize,
      search = "",
    }: { page: number; pageSize: number; search?: string },
    { getState }
  ) => {
    const token = getToken();
    const response = await axios.get(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: { page, pageSize, search },
    });
    
    return {
      data: response.data.pagedStaffs,
      totalCount: response.data.totalStaffs,
    };
  }
);

export const addStaff = createAsyncThunk<Staff, Staff>(
  "staff/addStaff",
  async (inputData) => {
    const token = getToken();
    const response = await axios.post<Staff>(apiUrl, inputData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const updateStaff = createAsyncThunk<
  Staff,
  { staffId: string; data: Staff }
>("staff/updateStaff", async ({ staffId, data }) => {
  const token = getToken();
  const response = await axios.put<Staff>(`${apiUrl}/${staffId}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const deleteStaff = createAsyncThunk<string, string>(
  "staff/deleteStaff",
  async (staffId) => {
    const token = getToken();
    await axios.delete(`${apiUrl}/${staffId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return staffId;
  }
);

const staffSlice = createSlice({
  name: "staff",
  initialState: {
    staffs: [] as Staff[],
    totalCount: 0,
    page: 1,
    pageSize: 5,
  } as StaffState,
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
      .addCase(fetchStaffs.fulfilled, (state, action) => {
        state.staffs = action.payload.data;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(addStaff.fulfilled, (state, action) => {
        state.staffs.push(action.payload);
      })
      .addCase(updateStaff.fulfilled, (state, action) => {
        const index = state.staffs.findIndex(
          (staff) => staff.staffId === action.payload.staffId
        );
        if (index !== -1) {
          state.staffs[index] = action.payload;
        }
      })
      .addCase(deleteStaff.fulfilled, (state, action) => {
        state.staffs = state.staffs.filter(
          (staff) => staff.staffId !== action.payload
        );
      });
  },
});

export const { setPage, setPageSize } = staffSlice.actions;

export default staffSlice.reducer;
