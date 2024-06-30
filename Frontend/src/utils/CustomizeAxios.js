import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:3000/api/",
  baseURL: "https://api.gptacademy.io.vn/api/",

  // timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
  //   timeout: 1000,
});

// // Add a response interceptor
// instance.interceptors.response.use(
//   function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
//   },
//   function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
//   }
// );

export default instance;
