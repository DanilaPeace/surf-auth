import { AxiosResponse } from "axios";

import { AuthResponseModel } from "../models/AuthResponse";
import { global_urls } from "../config/urls";
import api from "../http/auth-api";

interface SurfAuthResponse {
  id: string;
  deeplink: string;
  qrbase64: string;
}

export default class AuthService {
  static async login(
    address: string,
    publicKey: string
  ): Promise<AxiosResponse<AuthResponseModel>> {
    return api.post<AuthResponseModel>(global_urls.EVER_LOGIN, {
      address,
      publicKey,
    });
  }

  static async logout(): Promise<void> {
    return api.post(global_urls.LOGOUT);
  }

  static async surfLogin(): Promise<AxiosResponse<SurfAuthResponse>> {
    return await api.get<SurfAuthResponse>(global_urls.SURF_LOGIN);
  }
}
