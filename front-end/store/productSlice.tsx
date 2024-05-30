import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

type AppDispatch = (arg: any) => any;

interface Brand {
  brandId: string;
  brandName: string;
}

export type Product = {
  productId: string;
  productName: string;
  productImage: string;
  brandId: string;
  categoryId: string;
  quantity: string;
  unitPrice: string;
  status: string;
  createdBy: string;
  brand: Brand;
};

interface ProductState {
  products: Product[];
  totalCount: number;
  page: number;
  pageSize: number;
}

const apiUrl = "http://localhost:5057/api/Products";

const getToken = () => Cookies.get("token");

export const fetchProducts = createAsyncThunk<
  { data: Product[]; totalCount: number },
  { page: number; pageSize: number; search?: string },
  { state: any }
>("product/fetchProducts", async ({ page, pageSize, search = "" }) => {
  const token = getToken();
  const response = await axios.get<{
    pagedProducts: Product[];
    totalProducts: number;
  }>(
    apiUrl,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: { page, pageSize, search },
    }
  );
  return {
    data: response.data.pagedProducts,
    totalCount: response.data.totalProducts,
  };
});

export const addProduct = createAsyncThunk<Product, Product>(
  "product/addProduct",
  async (inputData) => {
    const token = getToken();
    const response = await axios.post<Product>(apiUrl, inputData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const updateProduct = createAsyncThunk<
  Product,
  { productId: string; data: any }
>("product/updateProduct", async ({ data, productId }) => {
  const token = getToken();
  const response = await axios.put<Product>(`${apiUrl}/${productId}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const deleteProduct = createAsyncThunk<string, string>(
  "product/deleteProduct",
  async (productId) => {
    const token = getToken();
    await axios.delete(`${apiUrl}/${productId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return productId;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [] as Product[],
    totalCount: 0,
    page: 1,
    pageSize: 5,
  } as ProductState,
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
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload.data;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product.productId === action.payload.productId
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

export const { setPage, setPageSize } = productSlice.actions;

export default productSlice.reducer;
