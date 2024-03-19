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

// Async action for updating a customer
export const updateCustomer = createAsyncThunk(
  "customers/updateCustomer",
  async (updateData: { id: string, data: any }) => {
    const response = await axios.put(`http://localhost:5000/api/v1/customers/${updateData.id}`, updateData.data);    
    return response.data.customer;
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
  reducers: {
    deleteCustomer: (state, action) => {
      state.customers = state.customers.filter(
        (customer) => customer.id !== action.payload
      );
    },
  },
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
      })
      .addCase(updateCustomer.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.loading = "idle";
      })
      .addCase(updateCustomer.rejected, (state) => {
        state.loading = "failed";
      });
  },
});

export const { deleteCustomer } = customerSlice.actions;
export const { reducer } = customerSlice;
export default customerSlice;
