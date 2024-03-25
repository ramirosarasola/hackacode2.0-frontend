import { UpdateSale } from "@/app/admin/sales/data-column";
import { Sale } from "@/interface/types";
import configApi from "@/utils/configApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = configApi.apiUrl;
console.log(apiUrl);

type ICreateSale = {
  employee_id: number;
  customer_id: number;
  payment_method: string;
  services: [];
};

// Async action for fetching customers
export const fetchSales = createAsyncThunk("sales/fetchSales", async () => {
  const response = await axios.get(`${apiUrl}:5000/api/v1/sales`);
  return response.data;
});
// Async action for fetching sales with details
export const fetchSalesWithDetails = createAsyncThunk(
  "sales/fetchSalesWithDetails",
  async () => {
    const response = await axios.get(`${apiUrl}:5000/api/v1/sales/details`);
    return response.data;
  }
);

export const createSale = createAsyncThunk(
  "sales/createSale",
  async (sale: ICreateSale) => {
    const response = await axios.post(`${apiUrl}:5000/api/v1/sales`, sale);
    return response.data;
  }
);

export const fetchEmployeeWithMoreSales = createAsyncThunk(
  "sales/fetchEmployeeWithMoreSales",
  async () => {
    const response = await axios.get(
      `${apiUrl}:5000/api/v1/sales/most-sales/2024`
    );
    return response.data;
  }
);

export const getSalesByEmployee = createAsyncThunk(
  "sales/getSalesByEmployee",
  async (employeeId: number) => {
    const response = await axios.get(
      `${apiUrl}:5000/api/v1/sales/employee/${employeeId}`
    );
    return response.data;
  }
);

// Async action for updating a sale
export const updateSale = createAsyncThunk(
  "sales/updateSale",
  async ({ id, data }: { id: number; data: UpdateSale | null }) => {
    const response = await axios.put(`${apiUrl}:5000/api/v1/sales/${id}`, data);
    return response.data;
  }
);

//Fetch sale by id
export const fetchSale = createAsyncThunk(
  "sales/fetchSale",
  async (id: string) => {
    const response = await axios.get(`${apiUrl}:5000/api/v1/sales/${id}`);
    return response.data;
  }
)

//soft delete for sale;
export const softDeleteSale = createAsyncThunk(
  "sales/softDeleteSale",
  async (id: number) => {
    const response = await axios.delete(`${apiUrl}:5000/api/v1/sales/${id}`);
    return response.data;
  }
);

// Sale slice
const saleSlice = createSlice({
  name: "sales",
  initialState: {
    sales: [] as Sale[],
    totalSalesCount: 0,
    employeeWithMoreSales: null,
    saleByEmployee: [],
    profitsByPayment: null,
    loading: "idle",
    error: null,
    fulfilled: false,
    sale: null
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
        state.profitsByPayment = action.payload.profit_by_payment_method;
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
      })
      .addCase(fetchEmployeeWithMoreSales.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchEmployeeWithMoreSales.fulfilled, (state, action) => {
        state.loading = "idle";
        state.employeeWithMoreSales = action.payload.result;
      })
      .addCase(fetchEmployeeWithMoreSales.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(getSalesByEmployee.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(getSalesByEmployee.fulfilled, (state, action) => {
        state.loading = "idle";
        state.saleByEmployee = action.payload.result;
      })
      .addCase(getSalesByEmployee.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(updateSale.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(updateSale.fulfilled, (state, action) => {
        state.loading = "idle";
        state.sales = state.sales.map((sale) =>
          sale.id === action.payload.sale.id ? action.payload.sale : sale
        );
      })
      .addCase(updateSale.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(softDeleteSale.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(softDeleteSale.fulfilled, (state, action) => {
        state.loading = "idle";
      })
      .addCase(softDeleteSale.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(fetchSale.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchSale.fulfilled, (state, action) => {
        state.loading = "idle";
        state.sale = action.payload.sale;
      })
      .addCase(fetchSale.rejected, (state) => {
        state.loading = "failed";
      })
  },
});

export const { reducer } = saleSlice;
export default saleSlice;
