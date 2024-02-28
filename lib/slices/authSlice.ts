import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import configApi from "../../utils/configApi";
import jwtDecode from "../../utils/setAuthToken";
import setAuthToken from "../../utils/setAuthToken";
import { AuthState, User, CustomError } from "@/interface/types";

const apiUrl = configApi.apiUrl;

const initialState: AuthState = {
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  isAuthenticated: false,
  isLoading: false,
  user: null,
  error: null,
};



function isTokenExpired(token: string | null): boolean {
  try {
    if (token) {
      const decoded = jwtDecode(token) as { exp?: any } | undefined;
      return decoded?.exp ? decoded.exp < Date.now() / 1000 : true;
    }
    return true;
  } catch (e) {
    return true;
  }
}

export const loadUser = createAsyncThunk<
  User,
  void,
  { rejectValue: CustomError }
>("auth/loadUser", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");

    if (token) {
      if (isTokenExpired(token)) {
        localStorage.removeItem("token");
      } else {
        setAuthToken(token);
      }
    }

    const res = await axios.get<User>(`${apiUrl}:5000/api/v1/auth/me`);
    return res.data;
  } catch (error) {
    return rejectWithValue({
      message: (error as CustomError).message || "Unknown error",
      status: (error as CustomError).status,
      error: (error as CustomError).error,
    });
  }
});

export const registerUser = createAsyncThunk<
  User,
  any,
  { rejectValue: CustomError }
>("api/v1/auth/register", async ({ newUser }, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(newUser);
    const response = await axios.post<User>(
      `${apiUrl}:5000/api/v1/auth/register`,
      body,
      config
    );

    return response.data;
  } catch (error) {
    return rejectWithValue({
      message: (error as CustomError).message || "Unknown error",
      status: (error as CustomError).status,
      error: (error as CustomError).error,
    });
  }
});

export const loginUser = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: CustomError }
>("auth/login", async ({ email, password }, { dispatch, rejectWithValue }) => {
  const body = { email, password };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.post<User>(
      `${apiUrl}:5000/api/v1/auth`,
      body,
      config
    );
    // Save token to local storage and set
    if (typeof window !== 'undefined') {
      localStorage.setItem("token", response.data.token);
    }
    
    dispatch(loadUser());
    return response.data;
  } catch (error) {
    return rejectWithValue({
      message: (error as CustomError).message || "Unknown error",
      status: (error as CustomError).status,
      error: (error as CustomError).error,
    });
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload
          ? action.payload
          : { message: "Unknown error" };
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload
          ? action.payload
          : { message: "Unknown error" };
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.user = action.payload;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.isLoading = false;
        state.user = null;
        state.error = action.payload
          ? action.payload
          : { message: "Unknown error" };
      });
  },
});

export const { logout } = authSlice.actions;
export const { reducer: authReducer, actions } = authSlice;
export default authSlice;