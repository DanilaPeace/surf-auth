import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import MainCollectionInfoTab from "../main-collection-info-tab/MainCollectionInfoTab";
import CommisionTab from "../commision-tab/CommisionTab";
import ParameterForm from "../parameter-form/ParameterForm";
import RarityForm from "../rarity-form/RarityForm";
import PagePreloader from "../common/page-preloader/PagePreloader";
import { store } from "../../store/MainStore";

import "./root-contract-form.css";

const RootContractForm = () => {
  let navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(true);

  const saveData = () => {
    store.sendingDataSave();
    navigate("/deploy-from-file", { state: { test: "test" } });
  };

  const generateContractsCode = () => {
    store.sendingDataContract();
    navigate("/deploy-from-file/", { state: { test: "test" } });
  };

  const deployContracts = async (event: React.FormEvent<HTMLButtonElement>) => {
    setIsLoaded(false);
    event.preventDefault();
    let data = await store.sendingDataDeploy();
    console.log("DATA: ", data);
    navigate(
      `/tokens-data-info/${data.collectionName}/${data.rootNftAddress}`,
      { state: { data: data } }
    );
    setIsLoaded(true);
  };

  return (
    <>
      {isLoaded ? (
        <form action="" className="root-contract-form">
          <Tabs
            defaultActiveKey="main"
            transition={false}
            id="root-contract-tabs"
            className="mb-3"
          >
            <Tab
              eventKey="main"
              title="Main"
              className="root-contract-tab-item"
            >
              <MainCollectionInfoTab />
            </Tab>
            <Tab
              eventKey="rarity"
              title="Rarity"
              className="root-contract-tab-item"
            >
              <RarityForm />
            </Tab>
            <Tab
              eventKey="commitsion"
              title="Commision"
              className="root-contract-tab-item"
            >
              <CommisionTab />
            </Tab>
            <Tab
              eventKey="parameters"
              title="Token Parameters"
              className="root-contract-tab-item"
            >
              <ParameterForm />
            </Tab>
          </Tabs>
          <div className="btn-toolbar root-contract-btn-toolbar">
            <button
              onClick={saveData}
              className="btn root-contract-btn btn-blue"
            >
              <i className="fas fa-file-download mr-2"></i>
              Save data
            </button>
            <button
              onClick={generateContractsCode}
              className="btn root-contract-btn btn-blue"
            >
              <i className="far fa-calendar-plus mr-2"></i>
              Generate contracts Code
            </button>
            <button
              onClick={deployContracts}
              className="btn root-contract-btn btn-blue"
            >
              <i className="fas fa-paper-plane mr-2"></i>
              Deploy contracts
            </button>
          </div>
        </form>
      ) : (
        <PagePreloader />
      )}
    </>
  );
};

export default RootContractForm;
