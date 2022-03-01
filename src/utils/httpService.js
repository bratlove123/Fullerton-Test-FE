import axios from "axios";
import Auth from "utils/auth";
// import { errorHandle } from "./commons";
// create an axios instance
const http = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use(
  async (config) => {
    const token = await Auth.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor
http.interceptors.response.use(
  (response) => {
    const res = response.data;
    return res;
  },
  (error) => {
    // errorHandle(error);
    return Promise.reject(error);
  }
);

export default http;
