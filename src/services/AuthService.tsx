import { AxiosResponse } from "axios";

import { AuthResponse } from "../models/AuthResponse";
import { global_urls } from "../config/urls";
import api from "../http/auth-api";

export default class AuthService {
  static async login(
    address: string,
    publicKey: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>(global_urls.LOGIN, { address, publicKey });
  }

  static async logout(): Promise<void> {
    return api.post(global_urls.LOGOUT);
  }
}
