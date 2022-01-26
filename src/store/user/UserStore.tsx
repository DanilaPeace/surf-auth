import { action, makeObservable, observable } from "mobx";

interface UserData {
  address: string;
}

class User {
  isAuth: boolean = true;
  currentUser: UserData = {} as UserData;

  constructor() {
    makeObservable(this, {
      isAuth: observable,
      logIn: action,
      logout: action,
    });
  }

  setAuth = (bool: boolean) => {
    this.isAuth = bool;
  }

  setUser = (user: UserData) => {
    this.currentUser = user;
  }

  logIn = async (/*userAddress: string*/) => {
    try {
      /**
       * Вызываем фукнцию для логина пользоватля
       * Или делаем прямо здесь, для начала
       * 
       * Получаем токен в ответе
       * 
       */

      localStorage.setItem('token', "TOKEN FROM SERVER")
      
      this.setAuth(true);
      // Присваиваем юзера
      // this.setUser()
    } catch (error) {
      console.log(error);
    }
  };
  
  logout = () => {
    this.currentUser = {
      address: ''
    };
    
    localStorage.removeItem("token");
    this.setAuth(false);
    // Удаляем юзера
    // this.setUser({} as UserData)
  };

  isAuthenticated = () => this.isAuth;
}

export const user = new User();
