import { makeAutoObservable } from "mobx";

import AuthService from "../../services/AuthService";
import { IUser } from "../../models/IUser";
import axios from "axios";
import { global_urls, SERVER_DOMAIN } from "../../config/urls";

export default class UserStore {
  isAuth: boolean = false;
  currentUser: IUser = {} as IUser;
  isLoading: boolean = false;
  qrValue: string = "";
  deepLink: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  setQrValue = (qrValue: string) => {
    this.qrValue = qrValue;
  };

  setDeepLink = (deepLinkValue: string) => {
    this.deepLink = deepLinkValue;
  };

  setAuth = (bool: boolean) => {
    this.isAuth = bool;
  };

  setUser = (user: IUser) => {
    this.currentUser = user;
  };

  isAuthenticated = () => this.isAuth;

  setLoading = (bool: boolean) => {
    this.isLoading = bool;
  };

  login = async (address: string, publicKey: string) => {
    this.setLoading(true);
    try {
      const serverResponse = await AuthService.login(address, publicKey);
      localStorage.setItem("accessToken", serverResponse.data.accessToken);
      this.setAuth(true);
      this.setUser(serverResponse.data.user);
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoading(false);
    }
  };

  surfLogin = async (loginData) => {
    localStorage.setItem("accessToken", loginData.accessToken);
    this.setAuth(true);
    this.setUser(loginData.user);
  };

  setDataForAuth = async () => {
    try {
      const surfAuthResponse = await AuthService.surfLogin();
      this.setQrValue(surfAuthResponse.data.deeplink);
      this.setDeepLink(surfAuthResponse.data.deeplink);
    } catch (error) {
      console.log(error);
    }
  };

  logout = async () => {
    this.setLoading(true);
    try {
      await AuthService.logout();
      localStorage.removeItem("accessToken");
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoading(false);
    }
  };

  checkAuth = async () => {
    this.setLoading(true);
    try {
      const serverResponse = await axios.get(
        SERVER_DOMAIN + global_urls.REFRESH,
        { withCredentials: true }
      );
      localStorage.setItem("accessToken", serverResponse.data.accessToken);
      this.setAuth(true);
      this.setUser(serverResponse.data.user);
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  };
}
