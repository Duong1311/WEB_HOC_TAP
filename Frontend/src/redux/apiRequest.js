import axios from "axios";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  registerFailure,
  registerStart,
  registerSuccess,
  logOutStart,
  logOutSuccess,
  logOutFailed,
} from "./authSlice";
import { toast } from "react-toastify";
import { URL } from "~/utils/createInstance";

export const loginUserGoogle = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`${URL}auth/google-auth`, user);

    if (res.data.status === false) {
      toast.error("Tài khoản của bạn đã bị khóa");
      dispatch(loginFailure());
      return;
    }

    if (res.data.admin === true) {
      // alert("Admin Login");
      dispatch(loginSuccess(res.data));

      navigate("/admin");
    } else {
      toast.success("Đăng nhập thành công");
      dispatch(loginSuccess(res.data));

      navigate("/");
    }
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`${URL}auth/login`, user);

    if (res.data.error) {
      toast.error(res.data.error);
      dispatch(loginFailure());
      return;
    }

    if (res.data.status === false) {
      toast.error("Tài khoản của bạn đã bị khóa");
      dispatch(loginFailure());
      return;
    }

    if (res.data.admin === true) {
      // alert("Admin Login");
      dispatch(loginSuccess(res.data));

      navigate("/admin");
    } else {
      toast.success("Đăng nhập thành công");
      dispatch(loginSuccess(res.data));

      navigate("/");
    }
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    const res = await axios.post(`${URL}auth/register`, user);
    if (res.data.error) {
      toast.error(res.data.error);
      dispatch(registerFailure());
      return;
    }

    if (res.status === 200) {
      dispatch(registerSuccess(res.data));
      navigate("/");
    }
  } catch (err) {
    dispatch(registerFailure());
  }
};

export const logOut = async (dispatch, id, navigate, accessToken, axiosJWT) => {
  dispatch(logOutStart());
  try {
    console.log("logout api");
    await axiosJWT.post(`${URL}auth/logout`, id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(logOutSuccess());
    navigate("/login");
  } catch (err) {
    dispatch(logOutFailed());
    console.log(err);
  }
};
