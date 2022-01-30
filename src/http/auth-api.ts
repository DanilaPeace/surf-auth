import axios from "axios";
import { SERVER_DOMAIN, global_urls } from "../config/urls";
import Cookies from "universal-cookie";
const cookie = new Cookies();

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
        const serverResponse = await axios.post(
          SERVER_DOMAIN + global_urls.REFRESH,
          {
            refreshToken: cookie.get("refreshToken"),
          },
          { withCredentials: true }
        );
        localStorage.setItem("accessToken", serverResponse.data.accessToken);
        cookie.set("refreshToken", serverResponse.data.refreshToken, {
          path: "/",
        });
        return api.request(originRequest);
      } catch (error) {
        localStorage.removeItem("accessToken");
        cookie.remove("refreshToken");
      }
    }
    // When error code !== 401
    throw error;
  }
);

export default api;
