import axios from "axios";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  registerFailure,
  registerStart,
  registerSuccess,
} from "./authSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:3000/api/auth/login", user);
    dispatch(loginSuccess(res.data));

    navigate("/");
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    const res = await axios.post(
      "http://localhost:3000/api/auth/register",
      user
    );
    dispatch(registerSuccess(res.data));

    navigate("/");
  } catch (err) {
    dispatch(registerFailure());
  }
};
