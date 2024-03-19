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


// Async action for creating an employee
export const createEmployee = createAsyncThunk(
  "employees/createEmployee",
  async (employee: { user_id: string, name: string, lastname: string, address: string, dni: string, birthdate: string, country: string, phone: string, position: string, salary: number }) => {
    const response = await axios.post("http://localhost:5000/api/v1/employees/create", employee);
});

export const fetchEmployeeById = createAsyncThunk(
  "employees/fetchEmployeeById",
  async (userId: string) => {
    const response =  await axios.get(`http://localhost:5000/api/v1/employees?user_id=${userId}`);
    console.log(response.data)
    return response.data;
  }
);


// Async action for updating an employee
export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async (updateData: { id: number, data: { user_id: string, name: string, lastname: string, address: string, dni: string, birthdate: string, country: string, phone: string, position: string, salary: number } }) => {
    const response = await axios.put(`http://localhost:5000/api/v1/employees/${updateData.id}`, updateData.data);
    return response.data.employee;
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
      .addCase(createEmployee.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.loading = "idle";
      })
      .addCase(createEmployee.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(updateEmployee.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.loading = "idle";
      })
      .addCase(updateEmployee.rejected, (state) => {
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
