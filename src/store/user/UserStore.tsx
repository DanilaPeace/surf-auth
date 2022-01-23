import { action, makeObservable, observable } from "mobx";

interface UserData {
  address: string;
}

class User {
  authenticated: boolean = false;
  currentUser: UserData = {} as UserData;

  constructor() {
    makeObservable(this, {
      authenticated: observable,
      logIn: action,
      logout: action,
    });
  }

  logIn = () => {
    this.authenticated = true;
  };

  logout = () => {
    this.authenticated = false;
    this.currentUser = {
      address: ''
    };

    localStorage.removeItem("token");
  };

  isAuthenticated = () => this.authenticated;
}

export const user = new User();
