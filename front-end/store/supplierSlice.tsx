import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

type AppDispatch = (arg: any) => any;

export type Brand = {
  brandId: string;
brandName: string;
brandStatus: string;
  createdBy: string;
};


interface BrandState {
    brands: Brand[];
}

const apiUrl = 'http://localhost:5057/api/Brands';

const getToken = () => Cookies.get('token');

export const fetchBrands = createAsyncThunk<Brand[]>(
  'Brand/fetchBrands',
  async () => {
    const token = getToken();
    const response = await axios.get<Brand[]>(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const addBrand = createAsyncThunk<Brand, Brand>(
  'Brand/addBrand',
  async (inputData) => {
    const token = getToken();
    const response = await axios.post<Brand>(apiUrl, inputData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const updateBrand = createAsyncThunk<Brand, { brandId: string; data: Brand } >(
  'Brand/updateBrand',
  async ({brandId,data}) => {
    const token = getToken();
    const response = await axios.put<Brand>(`${apiUrl}/${brandId}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

// Async thunk to delete a Brand
export const deleteBrand = createAsyncThunk<string, string>(
  'Brand/deleteBrand',
  async (brandId) => {
    const token = getToken();
    const response=await axios.delete(`${apiUrl}/${brandId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return brandId;
  }
);

// Brand slice
const brandSlice = createSlice({
  name: 'brand',
  initialState: {
    brands: [] as Brand[],
  } as BrandState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.brands = action.payload;
      })
      .addCase(addBrand.fulfilled, (state, action) => {
        state.brands.push(action.payload);
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        const index = state.brands.findIndex(
          (Brand) => Brand.brandId === action.payload.brandId
        );
        if (index !== -1) {
          state.brands[index] = action.payload;
        }
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.brands = state.brands.filter(
          (Brand) => Brand.brandId !== action.payload
        );
      });
  },
});

export default brandSlice.reducer;
