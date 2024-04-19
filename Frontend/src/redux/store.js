import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

export default configureStore({
  reducer: {
    // Add reducers here
    auth: authReducer,
  },
});
