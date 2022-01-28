import { FC, useContext, useEffect } from "react";
import { observer } from "mobx-react";

import NavBar from "../nav-bar/NavBar";

import "./App.css";
import { Context } from "../..";
import PagePreloader from "../common/page-preloader/PagePreloader";
import AppRoutes from "../../Routes";
import { BrowserRouter } from "react-router-dom";
const App: FC = () => {
  const { userStore } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      userStore.checkAuth();
    }
  }, []);

  if (userStore.isLoading) {
    return <PagePreloader />;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
};

export default observer(App);
