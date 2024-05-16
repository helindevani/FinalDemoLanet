import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

type AppDispatch = (arg: any) => any;

export type Staff = {
  staffId: string;
  staffName: string;
  aadharCardNo:string;
  gender:string;
  phoneNumber:string;
  joiningDate : Date;
  status: string;
  address : string;
  createdBy: string;
};


interface StaffState {
    staffs: Staff[];
}

const apiUrl = 'http://localhost:5057/api/Staffs';

const getToken = () => Cookies.get('token');

export const fetchStaffs = createAsyncThunk<Staff[]>(
  'Staff/fetchStaffs',
  async () => {
    const token = getToken();
    const response = await axios.get<Staff[]>(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const addStaff = createAsyncThunk<Staff, Staff>(
  'Staff/addStaff',
  async (inputData) => {
    const token = getToken();
    const response = await axios.post<Staff>(apiUrl, inputData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const updateStaff = createAsyncThunk<Staff, { staffId: string; data: Staff } >(
  'Staff/updateStaff',
  async ({staffId,data}) => {
    const token = getToken();
    const response = await axios.put<Staff>(`${apiUrl}/${staffId}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

// Async thunk to delete a Brand
export const deleteStaff = createAsyncThunk<string, string>(
  'Staff/deleteStaff',
  async (staffId) => {
    const token = getToken();
    const response=await axios.delete(`${apiUrl}/${staffId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return staffId;
  }
);

// Brand slice
const staffSlice = createSlice({
  name: 'Staff',
  initialState: {
    staffs: [] as Staff[],
  } as StaffState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStaffs.fulfilled, (state, action) => {
        state.staffs = action.payload;
      })
      .addCase(addStaff.fulfilled, (state, action) => {
        state.staffs.push(action.payload);
      })
      .addCase(updateStaff.fulfilled, (state, action) => {
        const index = state.staffs.findIndex(
          (Staff) => Staff.staffId === action.payload.staffId
        );
        if (index !== -1) {
          state.staffs[index] = action.payload;
        }
      })
      .addCase(deleteStaff.fulfilled, (state, action) => {
        state.staffs = state.staffs.filter(
          (Staff) => Staff.staffId !== action.payload
        );
      });
  },
});

export default staffSlice.reducer;
