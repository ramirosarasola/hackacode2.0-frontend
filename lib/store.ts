import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import employeeSlice from "./slices/employeeSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
      employee: employeeSlice.reducer,
    },
  });
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
