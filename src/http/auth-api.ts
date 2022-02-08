import axios from "axios";
import { SERVER_DOMAIN, global_urls } from "../config/urls";

const api = axios.create({
  withCredentials: true,
  baseURL: SERVER_DOMAIN,
});

api.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      "accessToken"
    )}`;
  }
  return config;
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originRequest._isRetry = true;
      try {
        const serverResponse = await axios.get(
          SERVER_DOMAIN + global_urls.REFRESH,
          { withCredentials: true }
        );
        localStorage.setItem("accessToken", serverResponse.data.accessToken);
        return api.request(originRequest);
      } catch (error) {
        localStorage.removeItem("accessToken");
      }
    }
    // When error code !== 401
    throw error;
  }
);

export default api;
