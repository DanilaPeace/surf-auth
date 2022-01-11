import { Routes, Route } from "react-router-dom";
import { Provider } from "mobx-react";

import NavBar from "../NavBar/NavBar";
import DeployFromFile from "../../pages/deploy-fro-file-page/DeployFromFilePage";
import Home from "../../pages/home-page/HomePage";
import RootContractPage from "../../pages/root-contract-page/RootContractPage";
import CollectionList from "../../pages/collection-list-page/CollectionListPage";
import CollectionInfo from "../collection-info/CollectionInfo";
import TokensDataInfo from "../../pages/tokens-data-info/TokensDataInfo";

import "./App.css";
import MintingTokensPage from "../../pages/mintiog-tokens/MintingTokensPage";

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
          <Route path="/collection-info" element={<CollectionInfo />} />
          <Route
            path="/tokens-data-info/:collectionName/:collectionAddress"
            element={<TokensDataInfo />}
          />
          <Route
            path="/minting-tokens/:collectionName/:collectionAddress"
            element={<MintingTokensPage />}
          />
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
