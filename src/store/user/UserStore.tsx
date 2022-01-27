import { action, makeObservable, observable } from "mobx";
import axios from "axios";

import AuthService from "../../services/AuthService";
import { IUser } from "../../models/IUser";
import { AuthResponse } from "../../models/AuthResponse";
import { global_urls } from "../../config/urls";

import Cookies from "universal-cookie";

export default class UserStore {
  isAuth: boolean = false;
  currentUser: IUser = {} as IUser;
  isLoading: boolean = false;
  cookies = new Cookies();

  constructor() {
    makeObservable(this, {
      isAuth: observable,
      isLoading: observable,
      currentUser: observable,
      setAuth: action,
      setUser: action,
      login: action,
      logout: action,
      setLoading: action,
    });
  }

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
      console.log("USER LOGIN RESPONSE: ", serverResponse);
      this.cookies.set("refreshToken", serverResponse.data.refreshToken, {
        path: "/",
      });
      localStorage.setItem("token", serverResponse.data.accessToken);
      this.setAuth(true);
      this.setUser(serverResponse.data.user);
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoading(false);
    }
  };

  logout = async () => {
    this.setLoading(true);
    try {
      const serverResponse = await AuthService.logout(
        this.cookies.get("refreshToken")
      );
      console.log("LOGOUT RESPONSE: ", serverResponse);
      localStorage.removeItem("token");
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
      const serverResponse = await AuthService.refresh(
        this.cookies.get("refreshToken")
      );
      console.log("REFRESH RESPONSE: ", serverResponse);
      localStorage.setItem("token", serverResponse.data.accessToken);
      this.cookies.set("refreshToken", serverResponse.data.refreshToken, {
        path: "/",
      });
      this.setAuth(true);
      this.setUser(serverResponse.data.user);
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  };
}
