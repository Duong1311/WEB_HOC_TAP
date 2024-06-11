import { createSlice } from "@reduxjs/toolkit";

const loginDataSlice = createSlice({
  name: "loginData",
  initialState: {
    email: null,
    otp: null,
  },
  reducers: {
    setEmailData: (state, action) => {
      state.email = action.payload;
    },
    setOtpData: (state, action) => {
      state.otp = action.payload;
    },
  },
});
export const { setEmailData, setOtpData } = loginDataSlice.actions;
export default loginDataSlice.reducer;
