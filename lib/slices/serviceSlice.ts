import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async action for fetching services
export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async () => {
    const response = await axios.get("http://localhost:5000/api/v1/services");
    return response.data;
  }
);

// Async action for updating a service
export const updateService = createAsyncThunk(
  "services/updateService",
  async (updateData: { id: string, data: any }) => {
    const response = await axios.put(`http://localhost:5000/api/v1/services/${updateData.id}`, updateData.data);    
    return response.data.service;
  }
);

// Service slice
const serviceSlice = createSlice({
  name: "services",
  initialState: {
    services: [],
    loading: "idle",
    error: null,
    fulfilled: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = "idle";
        state.services = action.payload.data;
      })
      .addCase(fetchServices.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(updateService.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.loading = "idle";
      })
      .addCase(updateService.rejected, (state) => {
        state.loading = "failed";
      });
  },
});


export const { reducer } = serviceSlice;
export default serviceSlice;
