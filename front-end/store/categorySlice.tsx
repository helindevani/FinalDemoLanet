import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

type AppDispatch = (arg: any) => any;

export type Category = {
  categoryId: string;
  categoryName: string;
  categoryStatus: string;
  createdBy: string;
};

interface CategoryState {
  categories: Category[];
  totalCount: number;
  page: number;
  pageSize: number;
}

const apiUrl = "http://localhost:5057/api/Categories";

const getToken = () => Cookies.get("token");

export const fetchCategories = createAsyncThunk<
  { data: Category[]; totalCount: number },
  { page: number; pageSize: number; search?: string },
  { state: any }
>("category/fetchCategories", async ({ page, pageSize, search = "" }) => {
  const token = getToken();
  const response = await axios.get<{ data: Category[]; totalCount: number }>(
    apiUrl,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: { page, pageSize, search },
    }
  );
  return response.data;
});

export const addCategory = createAsyncThunk<Category, Category>(
  "category/addCategory",
  async (inputData) => {
    const token = getToken();
    const response = await axios.post<Category>(apiUrl, inputData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const updateCategory = createAsyncThunk<
  Category,
  { categoryId: string; data: Category }
>("category/updateCategory", async ({ categoryId, data }) => {
  const token = getToken();
  const response = await axios.put<Category>(`${apiUrl}/${categoryId}`, data, {
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
    await axios.delete(`${apiUrl}/${categoryId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return categoryId;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [] as Category[],
    totalCount: 0,
    page: 1,
    pageSize: 5,
  } as CategoryState,
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
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload.data;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(
          (category) => category.categoryId === action.payload.categoryId
        );
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (category) => category.categoryId !== action.payload
        );
      });
  },
});

export const { setPage, setPageSize } = categorySlice.actions;

export default categorySlice.reducer;
