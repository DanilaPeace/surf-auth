import { Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <div className="App">
      <Provider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/root-contract-form" element={<RootContractPage />} />
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
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
