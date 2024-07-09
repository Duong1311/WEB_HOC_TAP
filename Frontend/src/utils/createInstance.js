import axios from "axios";
// import * as jwt_decode from "jwt-decode";
// import { jwt_Decode } from "jwt-decode";
// axios.defaults.withCredentials = true;
import { jwtDecode } from "jwt-decode";
axios.defaults.withCredentials = true;
// export const URL = "https://api.gptacademy.io.vn/api/";
export const URL = "http://localhost:3000/api/";

const refreshToken = async () => {
  try {
    console.log("refresh token");
    const res = await axios.post(`${URL}auth/refresh`, {
      withCredentials: true,
    });

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const createAxios = (user, dispatch, stateSuccess) => {
  const newInstance = axios.create();
  newInstance.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodedToken = jwtDecode(user?.accessToken);
      console.log(decodedToken.exp, date.getTime() / 1000);
      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken();
        const refreshUser = {
          ...user,
          accessToken: data.accessToken,
        };
        dispatch(stateSuccess(refreshUser));
        config.headers["token"] = "Bearer " + data.accessToken;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return newInstance;
};
