import { action, makeObservable, observable } from "mobx";

import AuthService from "../../services/AuthService";

interface UserData {
  address: string;
}

interface IUser {
  address: string;
  publicKey: string;
}

interface AuthResponse {
  success: boolean;
  data: IUser;
  token: string;
}

class User {
  isAuth: boolean = false;
  currentUser: UserData = {} as UserData;

  constructor() {
    makeObservable(this, {
      isAuth: observable,
      setAuth: action,
      setUser: action,
      logIn: action,
      logout: action,
    });
  }

  setAuth = (bool: boolean) => {
    this.isAuth = bool;
  };

  setUser = (user: UserData) => {
    this.currentUser = user;
  };

  logIn = async (/*userAddress: string*/) => {
    /**
     * TODO:
     * сделать сервисы для запроса на сервер
     */
    try {
      const serverResponse: AuthResponse = await AuthService.login();
      console.log("USER RESP: ", serverResponse);
      localStorage.setItem("token", serverResponse?.token);
      this.setAuth(true);
      // Присваиваем юзера
      // this.setUser()
    } catch (error) {
      console.log(error);
    }
  };

  logout = () => {
    this.currentUser = {
      address: "",
    };

    localStorage.removeItem("token");
    this.setAuth(false);
    // Удаляем юзера
    // this.setUser({} as UserData)
  };

  isAuthenticated = () => this.isAuth;
}

export const user = new User();
