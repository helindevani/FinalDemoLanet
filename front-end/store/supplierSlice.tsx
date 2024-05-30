import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

export type Brand = {
  brandId: string;
  brandName: string;
  brandStatus: string;
  createdBy: string;
};

interface BrandState {
  brands: Brand[];
  totalCount: number;
  page: number;
  pageSize: number;
}

const apiUrl = 'http://localhost:5057/api/Brands';

const getToken = () => Cookies.get('token');

export const fetchBrands = createAsyncThunk<{ data: Brand[]; totalCount: number },
{ page: number; pageSize: number; search?: string },
{ state: any }>(
  'Brand/fetchBrands',
  async (
    { page, pageSize, search = "" },
    { getState }
  ) => {
    const token = getToken();
    const response = await axios.get<{ data: Brand[]; totalCount: number }>(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      params: { page, pageSize, search },
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

export const updateBrand = createAsyncThunk<Brand, { brandId: string; data: Brand }>(
  'Brand/updateBrand',
  async ({ brandId, data }) => {
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

export const deleteBrand = createAsyncThunk<string, string>(
  'Brand/deleteBrand',
  async (brandId) => {
    const token = getToken();
    await axios.delete(`${apiUrl}/${brandId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return brandId;
  }
);

const brandSlice = createSlice({
  name: 'brand',
  initialState: {
    brands: [] as Brand[],
    totalCount: 0,
    page: 1,
    pageSize: 5,
  } as BrandState,
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
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.brands = action.payload.data;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(addBrand.fulfilled, (state, action) => {
        state.brands.push(action.payload);
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        const index = state.brands.findIndex(
          (brand) => brand.brandId === action.payload.brandId
        );
        if (index !== -1) {
          state.brands[index] = action.payload;
        }
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.brands = state.brands.filter(
          (brand) => brand.brandId !== action.payload
        );
      });
  },
});

export const { setPage, setPageSize } = brandSlice.actions;

export default brandSlice.reducer;
