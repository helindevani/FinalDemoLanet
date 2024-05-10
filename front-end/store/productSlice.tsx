import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

type AppDispatch = (arg: any) => any;

 interface brand{
  brandId:string;
  brandName:string;
 }

export type Product = {
  productId: string;
  productName: string;
  productImage:string;
  brandId:string;
  categoryId:string;
  quantity:string;
  unitPrice:string;
  status: string;
  createdBy: string;
  brand:brand;
};


interface ProductState {
    products: Product[];
}

const apiUrl = 'http://localhost:5057/api/Products';

const getToken = () => Cookies.get('token');

export const fetchProducts = createAsyncThunk<Product[]>(
  'product/fetchProducts',
  async () => {
    const token = getToken();
    const response = await axios.get<Product[]>(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const addProduct = createAsyncThunk<Product, Product>(
  'product/addProduct',
  async (inputData) => {
    const token = getToken();
    const response = await axios.post<Product>(apiUrl, inputData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const updateProduct = createAsyncThunk<Product, { productId: string; data: any }>(
  'product/updateProduct',
  async ({data,productId}) => {
    const token = getToken();
    const response = await axios.put<Product>(`${apiUrl}/${productId}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk<string, string>(
  'product/deleteProduct',
  async (productId) => {
    const token = getToken();
    const response=await axios.delete(`${apiUrl}/${productId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return productId;
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [] as Product[],
  } as ProductState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product.productId !== action.payload.productId
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.productId !== action.payload
        );
      });
  },
});

export default productSlice.reducer;
