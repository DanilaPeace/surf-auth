import { Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "mobx-react";

import NavBar from "../nav-bar/NavBar";
import DeployFromFile from "../../pages/deploy-fro-file-page/DeployFromFilePage";
import Home from "../../pages/home-page/HomePage";
import RootContractPage from "../../pages/root-contract-page/RootContractPage";
import CollectionList from "../../pages/collection-list-page/CollectionListPage";
import TokensDataInfo from "../../pages/tokens-data-info/TokensDataInfo";
import OneTokenInfo from "../../pages/one-token-info/OneTokenInfo";
import MintingTokensPage from "../../pages/minting-tokens/MintingTokensPage";

import "./App.css";
import SignIn from "../../pages/sign-in/SignIn";
import Error404 from "../../pages/error404/Error404";

function App() {
  return (
    <div className="App">
      <Provider>
        <NavBar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/root-contract-form" element={<RootContractPage />} />
          <Route path="/deploy-from-file" element={<DeployFromFile />} />
          <Route path="/collection-list" element={<CollectionList />} />
          <Route path="/signin" element={<SignIn />} />
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
}

export default App;
