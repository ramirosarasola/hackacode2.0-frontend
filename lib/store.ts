import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import employeeSlice from "./slices/employeeSlice";
import customerSlice from "./slices/customerSlice";
import serviceSlice from "./slices/serviceSlice";
import saleSlice from "./slices/saleSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
      employee: employeeSlice.reducer,
      customer: customerSlice.reducer,
      service: serviceSlice.reducer,
      sale: saleSlice.reducer
    },
  });
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
