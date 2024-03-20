import { Sale } from "@/interface/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async action for fetching customers
export const fetchSales = createAsyncThunk(
  "sales/fetchSales",
  async () => {
    const response = await axios.get("http://localhost:5000/api/v1/sales");
    console.log(response.data)
    return response.data;
  }
);
// Async action for fetching sales with details
export const fetchSalesWithDetails = createAsyncThunk(
  "sales/fetchSalesWithDetails",
  async () => {
    const response = await axios.get("http://localhost:5000/api/v1/sales/details");
    return response.data;
  }
);

export const createSale = createAsyncThunk(
  "sales/createSale",
  async (sale: Sale) => {
    const response = await axios.post("http://localhost:5000/api/v1/sales", sale);
    return response.data;
  }
);



// Sale slice
const saleSlice = createSlice({
  name: "sales",
  initialState: {
    sales: [],
    totalSalesCount: 0,
    loading: "idle",
    error: null,
    fulfilled: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSales.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchSales.fulfilled, (state, action) => {
        state.loading = "idle";
        state.sales = action.payload.sales;
        console.log(action.payload.sales)
      })
      .addCase(fetchSales.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(fetchSalesWithDetails.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchSalesWithDetails.fulfilled, (state, action) => {
        state.loading = "idle";
        state.sales = action.payload.sales;
        state.totalSalesCount = action.payload.total_sales;
      })
      .addCase(fetchSalesWithDetails.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(createSale.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(createSale.fulfilled, (state, action) => {
        state.loading = "idle";
        state.sales.push(action.payload.sale);
      })
      .addCase(createSale.rejected, (state) => {
        state.loading = "failed";
      });
  },
});

export const { reducer } = saleSlice;
export default saleSlice;
