import { action, makeObservable, observable } from "mobx";
import Cookies from "universal-cookie";

import AuthService from "../../services/AuthService";
import { IUser } from "../../models/IUser";

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
      cookies: observable,
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
      this.cookies.set("refreshToken", serverResponse.data.refreshToken, {
        path: "/",
      });
      localStorage.setItem("accessToken", serverResponse.data.accessToken);
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
      await AuthService.logout(this.cookies.get<string>("refreshToken"));
      localStorage.removeItem("accessToken");
      this.cookies.remove("refreshToken");
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
        this.cookies.get<string>("refreshToken")
      );
      localStorage.setItem("accessToken", serverResponse.data.accessToken);
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
