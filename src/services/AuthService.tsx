import { AxiosResponse } from "axios";

import { AuthResponseModel } from "../models/AuthResponse";
import { global_urls } from "../config/urls";
import api from "../http/auth-api";

export default class AuthService {
  static async login(
    address: string,
    publicKey: string
  ): Promise<AxiosResponse<AuthResponseModel>> {
    return api.post<AuthResponseModel>(global_urls.LOGIN, {
      address,
      publicKey,
    });
  }

  static async logout(refreshToken: string): Promise<void> {
    return api.post(global_urls.LOGOUT, { refreshToken });
  }

  static async refresh(
    refreshToken: string
  ): Promise<AxiosResponse<AuthResponseModel>> {
    return api.post<AuthResponseModel>(global_urls.REFRESH, { refreshToken });
  }
}
