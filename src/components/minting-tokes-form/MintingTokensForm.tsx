import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import ParamsField from "./ParamsField";
import RaritiesField from "./RaritiasField";
import SignField from "./SignField";

import { global_urls } from "../../config/urls";
import "./minting-tokens-form.css";

type ServerMintingResponse = {
  collectionInfo: any;
  collectionName: string;
  collecitonRootAddress: string;
};

const MintingTokensForm = () => {
  const urlParams = useParams();
  const defaultParamsForMint = {
    rootAddress: urlParams.collectionAddress,
    contractName: urlParams.collectionName,
    url: "",
    editionNumber: 1,
    editionAmount: 1,
    managersList: [],
    royalty: 1,
  };

  const [serverInfoForMint, setServerInfoForMint] =
    useState<ServerMintingResponse>({
      collectionInfo: {},
      collectionName: "",
      collecitonRootAddress: "",
    });
  const [isLoaded, setIsLoaded] = useState(false);
  const [paramsForMint, setParamsForMint] = useState(defaultParamsForMint);
  const mintingNavigate = useNavigate();

  const getServerInfoForMint = () => {
    fetch(global_urls.MINTING_INFORMATION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        colName: urlParams.collectionName,
        colAdd: urlParams.collectionAddress,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setServerInfoForMint(data);
        setIsLoaded(true);
      })
      .catch((error) => error);
  };

  const onHadleSubmit = async (event) => {
    event.preventDefault();
    const serverResponse = await makeFetchReqToMintAndGetResponse();
    redirectToInfoCollection(serverResponse);
  };

  const makeFetchReqToMintAndGetResponse = async () => {
    const serverResponse = await fetch(global_urls.MINTING_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paramsForMint),
    })
      .then((res) => res.json())
      .catch((err) => console.error(err));

    return serverResponse;
  };

  const redirectToInfoCollection = (dataForView) =>
    mintingNavigate("/tokens-data-info", { state: dataForView });

  useEffect(getServerInfoForMint, [
    urlParams.collectionAddress,
    urlParams.collectionName,
  ]);

  return (
    <div className="MintingTokensFormContainer container">
      {isLoaded ? (
        <form
          onSubmit={onHadleSubmit}
          method="post"
          className="main-form minting-tokens-form"
        >
          <RaritiesField
            rarities={serverInfoForMint.collectionInfo.rarities}
            onRaritiesSelect={setParamsForMint}
            paramsForMint={paramsForMint}
          />
          <ParamsField
            variables={serverInfoForMint.collectionInfo.variables}
            onParamsChange={setParamsForMint}
            paramsForMint={paramsForMint}
          />
          <SignField
            signFieldChange={setParamsForMint}
            paramsForMint={paramsForMint}
          />
          <button className="MintingTokensFormBtn btn btn-blue">
            <i className="fas fa-plus"></i>
            Minting
          </button>
        </form>
      ) : (
        ""
      )}
    </div>
  );
};

export default MintingTokensForm;
