import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import CollectionListContainer from "./components/collection-list-container/CollectionListContainer";
import PrivateRoute from "./components/private-route/PrivateRoute";
import DeployFromFile from "./pages/deploy-from-file-page/DeployFromFilePage";
import Error404 from "./pages/error404/Error404";
import Home from "./pages/home-page/HomePage";
import MintingTokensPage from "./pages/minting-tokens/MintingTokensPage";
import OneTokenInfo from "./pages/one-token-info/OneTokenInfo";
import RootContractPage from "./pages/root-contract-page/RootContractPage";
import SignIn from "./pages/sign-in/SignIn";
import TokensDataInfo from "./pages/tokens-data-info/TokensDataInfo";

const AppRoutes = () => {
  return (
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

      <Route
        path="/deploy-from-file"
        element={
          <PrivateRoute>
            <DeployFromFile />
          </PrivateRoute>
        }
      />

      <Route
        path="/collection-list"
        element={
          <PrivateRoute>
            <CollectionListContainer />
          </PrivateRoute>
        }
      />

      <Route
        path="/tokens-data-info/:collectionName/:collectionAddress"
        element={
          <PrivateRoute>
            <TokensDataInfo />
          </PrivateRoute>
        }
      />

      <Route
        path="/minting-tokens/:collectionName/:collectionAddress"
        element={
          <PrivateRoute>
            <MintingTokensPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/one-token-info/:tokenAddress"
        element={
          <PrivateRoute>
            <OneTokenInfo />
          </PrivateRoute>
        }
      />

      <Route path="/error-404" element={<Error404 />} />
      <Route path="*" element={<Navigate to="/error-404" />} />
    </Routes>
  );
};

export default AppRoutes;
