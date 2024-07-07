import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api/",
  // baseURL: "https://api.gptacademy.io.vn/api/",

  // timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
  //   timeout: 1000,
});

export default instance;
