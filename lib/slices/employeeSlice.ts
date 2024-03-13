import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async action for fetching employees
export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async () => {
    const response = await axios.get("http://localhost:5000/api/v1/employees");
    return response.data;
  }
);

// Employee slice
const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    employees: [],
    loading: "idle",
    error: null,
    fulfilled: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = "idle";
        state.employees = action.payload.employees;
      })
      .addCase(fetchEmployees.rejected, (state) => {
        state.loading = "failed";
      });
  },
});

export const { reducer } = employeeSlice;
export default employeeSlice;
