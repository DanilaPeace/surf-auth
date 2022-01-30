import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";

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
  <Context.Provider
    value={{
      userStore,
    }}
  >
    <App />
  </Context.Provider>,
  document.getElementById("root")
);
