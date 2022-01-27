import axios from "axios";
import { DOMAIN } from "../config/urls";

const api = axios.create({
  withCredentials: true,
  baseURL: DOMAIN,
});

api.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return config;
});

export default api;
