'use client';
import {
  configureStore,
  createSlice,
  createAsyncThunk,
  PayloadAction
} from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";
import axiosInstance from '../Interceptor/axiosConfig';

interface LoginCredentials {
  email: string;
  password: string;
  rememberPassword: boolean;
  fcmToken : string | null;
}

interface RegistrationData {
  Email: string;
  Name : string;
  MobaileNo : string;
  Password: string;
  ConfirmPassword: string;
}

interface ResetPasswordData {
  Email: string;
  NewPassword: string;
} 

interface ForgotPasswordData {
  Email: string;
}

interface AuthState {
  token: string | null;
  error: string | null;
  loading: boolean;
  status : string;
}

export const loginUser = createAsyncThunk<string, LoginCredentials>(
  "auth/loginUser",
  async ({ email, password, fcmToken,rememberPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5057/api/Account/login",
        {
          Email: email,
          Password: password,
          FcmToken : fcmToken
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      Cookies.set("token", response.data.token);

      if (rememberPassword) {
        localStorage.setItem("savedEmail", email);
        localStorage.setItem("savedPassword", password);
      } else {
        localStorage.removeItem("savedEmail");
        localStorage.removeItem("savedPassword");
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk<string,RegistrationData>(
  "auth/registerUser",
  async (data: RegistrationData, { rejectWithValue }) => {
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:5057/api/Account/register",
        data
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk<string,ResetPasswordData>(
  "auth/resetPassword",
  async (data: ResetPasswordData) => {
    try {
      const response = await axios.post(
        "http://localhost:5057/api/Account/resetpassword",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);

export const forgotPassword = createAsyncThunk<string,ForgotPasswordData>(
  "auth/forgotPassword",
  async (data : ForgotPasswordData):Promise<any> => {
    try {
      const response = await axios.post(
        "http://localhost:5057/api/Account/forgotpassword",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Reset password email sent to:", data.Email);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);

const initialState: AuthState = {
  token: null,
  error: null,
  loading: false,
  status: 'idle',
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state : any) =>{
      state.token=null
      state.status='idle'
      Cookies.remove('token')
    },
    setAuthStatus: (state, action : PayloadAction<string>) => {
      state.status = action.payload;
  }
},
  extraReducers: (builder : any) => {
    builder
      .addCase(loginUser.pending, (state : AuthState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state : AuthState, action : PayloadAction<string>) => {
        state.loading = false;
        state.token = action.payload;
        state.status = 'success';
      })
      .addCase(loginUser.rejected, (state : AuthState, action : PayloadAction<string>) => {
        state.loading = false;
        (state.error as any) = action.payload;
        state.status = 'error';
      })
      .addCase(registerUser.pending, (state : AuthState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state : AuthState) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state : AuthState, action : PayloadAction<string>) => {
        state.loading = false;
        (state.error as any) = action.payload;
      })
      .addCase(resetPassword.pending, (state : AuthState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state : AuthState) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state : AuthState, action : any) => {
        state.loading = false;
        (state.error as any) = action.error.message;
      })
      .addCase(forgotPassword.pending, (state : AuthState, action : PayloadAction<string>) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state : AuthState) => {
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state : AuthState, action : any) => {
        state.loading = false;
        (state.error as any) = action.error.message;
      });
  }
});

export const { setAuthStatus , logout} = authSlice.actions;

export default authSlice.reducer;
