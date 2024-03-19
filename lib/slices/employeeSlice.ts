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

export const fetchEmployeeById = createAsyncThunk(
  "employees/fetchEmployeeById",
  async (userId: string) => {
    const response =  await axios.get(`http://localhost:5000/api/v1/employees?user_id=${userId}`);
    console.log(response.data)
    return response.data;
  }
);

// Employee slice
const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    employees: [],
    employee : null,
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
        state.employees = action.payload.data})
      .addCase(fetchEmployees.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(fetchEmployeeById.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.loading = "idle";
        state.employee = action.payload.data
      })
      .addCase(fetchEmployeeById.rejected, (state) => {
        state.loading = "failed";
      })

  },
});

export const { reducer } = employeeSlice;
export default employeeSlice;
