import { Customer } from "@/interface/types";
import configApi from "@/utils/configApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const apiUrl = configApi.apiUrl;

// Async action for fetching customers
export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",
  async () => {
    const response = await axios.get(`${apiUrl}:5000/api/v1/customers`);
    return response.data;
  }
);

// Async action for updating a customer
export const updateCustomer = createAsyncThunk(
  "customers/updateCustomer",
  async (updateData: { id: number; data: any }) => {
    const response = await axios.put(
      `${apiUrl}:5000/api/v1/customers/${updateData.id}`,
      updateData.data
    );
    return response.data.customer;
  }
);

//Ayth action for creating a customer
export const createCustomer = createAsyncThunk(
  "customers/createCustomer",
  async (customerData: any) => {
    const response = await axios.post(
      `${apiUrl}:5000/api/v1/customers/create`,
      customerData
    );
    return response.data.customer;
  }
);

export const softDeleteCustomer = createAsyncThunk(
  "customers/softDeleteCustomer",
  async (id: number) => {
    const response = await axios.put(`${apiUrl}:5000/api/v1/customers/softdelete/${id}`);
    return response.data;
  }
);

// Customer slice
const customerSlice = createSlice({
  name: "customers",
  initialState: {
    customers: [] as Customer[],
    loading: "idle",
    error: null,
    fulfilled: false,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = "idle";
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(updateCustomer.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.loading = "idle";
        // Update the specific employee in the array with the updated data
        state.customers = state.customers.map((customer) =>
          customer.id === action.payload.id ? action.payload : customer
        );
      })
      .addCase(updateCustomer.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(createCustomer.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.loading = "idle";
        state.customers.push(action.payload);
      })
      .addCase(createCustomer.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(softDeleteCustomer.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(softDeleteCustomer.fulfilled, (state, action) => {
        state.loading = "idle";
        state.customers = state.customers = state.customers.filter(
          (customer) => customer.id !== action.payload
        );
      })
      .addCase(softDeleteCustomer.rejected, (state) => {
        state.loading = "failed";
      })
  },
});

export const { reducer } = customerSlice;
export default customerSlice;
