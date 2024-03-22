import { Service } from "@/interface/types";
import configApi from "@/utils/configApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = configApi.apiUrl;

// Async action for fetching services
export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async () => {
    const response = await axios.get(`${apiUrl}:5000/api/v1/services`);
    return response.data;
  }
);

// Async action for updating a service
export const updateService = createAsyncThunk(
  "services/updateService",
  async (updateData: { id: number; data: any }) => {
    const response = await axios.put(
      `${apiUrl}:5000/api/v1/services/${updateData.id}`,
      updateData.data
    );
    return response.data.service;
  }
);

export const createService = createAsyncThunk(
  "services/createService",
  async (serviceData: Service) => {
    const response = await axios.post(
      `${apiUrl}:5000/api/v1/services`,
      serviceData
    );
    return response.data.service;
  }
);

// Service slice
const serviceSlice = createSlice({
  name: "services",
  initialState: {
    services: [] as Service[],
    loading: "idle",
    error: null,
    fulfilled: false,
  },
  reducers: {
    // add reducers here
    deleteService: (state, action) => {
      state.services = state.services.filter(
        (service) => service.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = "idle";
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(updateService.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.loading = "idle";
        state.services = state.services.map((service) =>
          service.id === action.payload.id ? action.payload : service
        );
      })
      .addCase(updateService.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(createService.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.loading = "idle";
      })
      .addCase(createService.rejected, (state) => {
        state.loading = "failed";
      });
  },
});

export const { deleteService } = serviceSlice.actions;
export const { reducer } = serviceSlice;
export default serviceSlice;
