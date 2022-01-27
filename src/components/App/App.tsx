import { FC, useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { observer, Provider } from "mobx-react";

import NavBar from "../nav-bar/NavBar";
import DeployFromFile from "../../pages/deploy-from-file-page/DeployFromFilePage";
import Home from "../../pages/home-page/HomePage";
import RootContractPage from "../../pages/root-contract-page/RootContractPage";
import CollectionList from "../../pages/collection-list-page/CollectionListPage";
import TokensDataInfo from "../../pages/tokens-data-info/TokensDataInfo";
import OneTokenInfo from "../../pages/one-token-info/OneTokenInfo";
import MintingTokensPage from "../../pages/minting-tokens/MintingTokensPage";
import SignIn from "../../pages/sign-in/SignIn";
import Error404 from "../../pages/error404/Error404";

import "./App.css";
import PrivateRoute from "../private-route/PrivateRoute";
import { Context } from "../..";
import PagePreloader from "../common/page-preloader/PagePreloader";

const App: FC = () => {
  const { userStore } = useContext(Context);

  useEffect(() => {
    console.log("IN APP IN USEEFFECT: ", userStore.isLoading);
    if (localStorage.getItem("token")) {
      userStore.checkAuth();
    }
  }, [userStore]);

  
  if (userStore.isLoading) {
    return <PagePreloader />;
  }

  return (
    <div className="App">
      <Provider>
        <NavBar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/signin" element={<SignIn />} />

          {/* Private routes */}
          <Route
            path="/root-contract-form"
            element={
              <PrivateRoute>
                <RootContractPage />
              </PrivateRoute>
            }
          />
          <Route path="/deploy-from-file" element={<DeployFromFile />} />
          <Route path="/collection-list" element={<CollectionList />} />
          <Route
            path="/tokens-data-info/:collectionName/:collectionAddress"
            element={<TokensDataInfo />}
          />
          <Route
            path="/minting-tokens/:collectionName/:collectionAddress"
            element={<MintingTokensPage />}
          />
          <Route
            path="/one-token-info/:tokenAddress"
            element={<OneTokenInfo />}
          />
          <Route path="/error-404" element={<Error404 />} />
          <Route path="*" element={<Navigate to="/error-404" />} />
        </Routes>
      </Provider>
    </div>
  );
};

export default observer(App);
