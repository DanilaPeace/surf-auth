import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

  const makeFetchRequestToMint = (event) => {
    event.preventDefault();

    fetch(global_urls.MINTING_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paramsForMint),
    })
      .then((res) => res.json())
      .then((data) => console.log("DATA: ", data))
      .catch((err) => console.log(err));
    
    setParamsForMint(defaultParamsForMint);
  };

  useEffect(getServerInfoForMint, [
    urlParams.collectionAddress,
    urlParams.collectionName,
  ]);

  return (
    <div className="container">
      {isLoaded ? (
        <form
          onSubmit={makeFetchRequestToMint}
          method="post"
          className="main-form minting-tokens-form"
        >
          <RaritiesField
            rarities={serverInfoForMint.collectionInfo.rarities}
            onRaritiesChange={setParamsForMint}
            paramsForMint={paramsForMint}
          />
          <ParamsField
            variables={serverInfoForMint.collectionInfo.variables}
            onRaritiesChange={setParamsForMint}
            paramsForMint={paramsForMint}
          />
          <SignField
            signFieldChange={setParamsForMint}
            paramsForMint={paramsForMint}
          />
          <button className="btn btn-blue">Submit</button>
        </form>
      ) : (
        ""
      )}
    </div>
  );
};

export default MintingTokensForm;
