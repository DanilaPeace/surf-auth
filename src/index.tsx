import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";

import UserStore from "./store/user/UserStore";
import { createContext } from "react";
import CollectionListStore from "./store/collection-list/CollectionListStore";

interface MainStore {
  userStore: UserStore;
  collectionListStore: CollectionListStore 
}

const userStore = new UserStore();
const collectionListStore = new CollectionListStore();

export const Context = createContext<MainStore>({
  userStore,
  collectionListStore
});

ReactDOM.render(
  <Context.Provider
    value={{
      userStore,
      collectionListStore
    }}
  >
    <App />
  </Context.Provider>,
  document.getElementById("root")
);
