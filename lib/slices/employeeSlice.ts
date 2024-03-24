import { Employee } from "@/interface/types";
import configApi from "@/utils/configApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = configApi.apiUrl;

// Async action for fetching employees
export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async () => {
    const response = await axios.get(`${apiUrl}:5000/api/v1/employees`);
    return response.data;
  }
);

// Async action for creating an employee
export const createEmployee = createAsyncThunk(
  "employees/createEmployee",
  async (employee: Employee) => {
    const response = await axios.post(
      `${apiUrl}:5000/api/v1/employees/create`,
      employee
    );
  }
);

export const fetchEmployee = createAsyncThunk(
  "employees/fetchEmployee",
  async (id: string) => {
    const response = await axios.get(`${apiUrl}:5000/api/v1/employees/${id}`);
    return response.data;
  }
);

export const fetchEmployeeById = createAsyncThunk(
  "employees/fetchEmployeeById",
  async (userId: number) => {
    const response = await axios.get(
      `${apiUrl}:5000/api/v1/employees/user/${userId}`
    );
    return response.data;
  }
);

// Async action for updating an employee
export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async (updateData: {
    id: number;
    data: {
      user_id: number;
      name: string;
      lastname: string;
      address: string;
      dni: string;
      birthdate: string;
      country: string;
      phone: string;
      position: string;
      salary: number;
    };
  }) => {
    const response = await axios.put(
      `${apiUrl}:5000/api/v1/employees/${updateData.id}`,
      updateData.data
    );
    return response.data.employee;
  }
);

export const softDeleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (id: number) => {
    const response = await axios.put(
      `${apiUrl}:5000/api/v1/employees/softdelete/${id}`
    );
    return response.data;
  }
);

// Employee slice
const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    employees: [] as Employee[],
    employee: null,
    userEmployee: null,
    loading: "idle",
    error: null,
    fulfilled: false,
  },
  reducers: {
    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter(
        (employee) => employee.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = "idle";
        state.employees = action.payload.filter(
          (employee: Employee) => employee.is_active === true
        );
      })
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
        // Update the specific employee in the array with the updated data
        state.employees = state.employees.map((employee) =>
          employee.id === action.payload.id ? action.payload : employee
        );
      })
      .addCase(updateEmployee.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(fetchEmployeeById.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.loading = "idle";
        state.userEmployee = action.payload.employee;
      })
      .addCase(fetchEmployeeById.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(softDeleteEmployee.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(softDeleteEmployee.fulfilled, (state, action) => {
        state.loading = "idle";
        state.employees = state.employees = state.employees.filter(
          (employee) => employee.id !== action.payload
        );
      })
      .addCase(softDeleteEmployee.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(fetchEmployee.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchEmployee.fulfilled, (state, action) => {
        state.loading = "idle";
        state.employee = action.payload.employee;
      })
      .addCase(fetchEmployee.rejected, (state) => {
        state.loading = "failed";
      });
  },
});

export const { deleteEmployee } = employeeSlice.actions;
export const { reducer } = employeeSlice;
export default employeeSlice;
