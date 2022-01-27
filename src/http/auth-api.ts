import axios from "axios";
import { DOMAIN, global_urls } from "../config/urls";
import { AuthResponse } from "../models/AuthResponse";

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

api.interceptors.response.use(
  (config) => {
    console.log("CONFIG IN AUTH API");
    return config;
  },
  async (error) => {
    console.log("ERROR IN AUTH API");
    
    const originRequest = error.config;
    if (
      error.reponse.status === 401 &&
      error.config &&
      !originRequest._isRetry
    ) {
      try {
        originRequest._isRetry = true;
        const serverResponse = await axios.get<AuthResponse>(
          global_urls.REFRESH,
          {
            withCredentials: true,
          }
        );
        localStorage.setItem("token", serverResponse.data.accessToken);
        // To repeate the request
        return api.request(originRequest);
      } catch (error) {
        console.log("USER IS NOT AUTH");
      }
    }
    console.log("ERROR AFTER TRY IN REFRESH");
    
    // When error code !== 401
    throw error;
  }
);
export default api;
