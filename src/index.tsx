import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
import { BrowserRouter } from "react-router-dom";

import UserStore from "./store/user/UserStore";
import { createContext } from "react";

interface MainStore {
  userStore: UserStore;
}

const userStore = new UserStore();

export const Context = createContext<MainStore>({
  userStore,
});

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <Context.Provider
        value={{
          userStore,
        }}
      >
        <App />
      </Context.Provider>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById("root")
);
