import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async action for fetching customers
export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",
  async () => {
    const response = await axios.get("http://localhost:5000/api/v1/customers");
    return response.data;
  }
);

// Customer slice
const customerSlice = createSlice({
  name: "customers",
  initialState: {
    customers: [],
    loading: "idle",
    error: null,
    fulfilled: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = "idle";
        state.customers = action.payload.data;
      })
      .addCase(fetchCustomers.rejected, (state) => {
        state.loading = "failed";
      });
  },
});

export const { reducer } = customerSlice;
export default customerSlice;
