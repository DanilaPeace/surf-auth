import { action, makeObservable, observable } from "mobx";
import axios from "axios";

import AuthService from "../../services/AuthService";
import { IUser } from "../../models/IUser";
import { AuthResponse } from "../../models/AuthResponse";
import { global_urls } from "../../config/urls";

export default class UserStore {
  isAuth: boolean = false;
  currentUser: IUser = {} as IUser;
  isLoading: boolean = false;

  constructor() {
    makeObservable(this, {
      isAuth: observable,
      isLoading: observable,
      currentUser: observable,
      setAuth: action,
      setUser: action,
      login: action,
      logout: action,
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
    console.log(">>> IS LOADING IN LOGIN:", this.isLoading);
    try {
      const serverResponse = await AuthService.login(address, publicKey);
      console.log("USER LOGIN RESPONSE: ", serverResponse);
      localStorage.setItem("token", serverResponse.data.accessToken);
      this.setAuth(true);
      this.setUser(serverResponse.data.user);
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoading(false);
      console.log(">>> IS LOADING IN LOGIN:", this.isLoading);
    }
  };

  logout = async () => {
    this.setLoading(true);
    console.log(">>> IS LOADING IN LOGOUT:", this.isLoading);

    try {
      const serverResponse = await AuthService.logout();
      console.log("LOGOUT RESPONSE: ", serverResponse);
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoading(false);
      console.log(">>> IS LOADING IN LOGOUT:", this.isLoading);
    }
  };

  checkAuth = async () => {
    this.setLoading(true);
    console.log(">>> IS LOADING in REFRESH: 1", this.isLoading);
    try {
      const serverResponse = await axios.get<AuthResponse>(
        global_urls.REFRESH,
        {
          withCredentials: true,
        }
      );
      console.log("REFRESH RESPONSE: ", serverResponse);
      // localStorage.setItem("token", serverResponse.data.accessToken);
      localStorage.setItem("token", "CURRENT DATA");
      this.setAuth(true);
      this.setUser(serverResponse.data.user);
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
    console.log(">>> IS LOADING in REFRESH 2:", this.isLoading);
  };
}
