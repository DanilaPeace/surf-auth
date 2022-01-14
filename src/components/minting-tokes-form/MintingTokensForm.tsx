import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ParamsField from "./ParamsField";
import RaritiesField from "./RaritiesField";
import SignField from "./SignField";
import PagePreloader from "../common/page-preloader/PagePreloader";

import { global_urls } from "../../config/urls";
import apiCall from "../../api/CallApi";
import "./minting-tokens-form.css";
import EnumField from "./EnumField";

interface ServerMintingResponse {
  collectionInfo: any;
  collectionName: string;
  collecitonRootAddress: string;
}

interface DefaultMintingParams {
  rootAddress: string | undefined;
  contractName: string | undefined;
  url: "";
  editionNumber: number;
  editionAmount: number;
  managersList: number[];
  royalty: number;
  rarities: string;
}

const MintingTokensForm = () => {
  const urlParams = useParams();
  const [infoFromServerToMint, setInfoFromServerToMint] =
    useState<ServerMintingResponse>({
      collectionInfo: {},
      collectionName: "",
      collecitonRootAddress: "",
    });
  const [isLoaded, setIsLoaded] = useState(false);
  const [mintParams, setMintParams] = useState<DefaultMintingParams>({
    rootAddress: urlParams.collectionAddress,
    contractName: urlParams.collectionName,
    url: "",
    editionNumber: 1,
    editionAmount: 1,
    managersList: [],
    royalty: 1,
    rarities: "",
  });
  const mintNavigate = useNavigate();

  const onHadleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    if (rarityIsEmpty()) {
      // When user didn't select the rarity for token
      mintParams.rarities =
        infoFromServerToMint.collectionInfo.rarities[0].name;
    }
    // For view preloader
    setIsLoaded(false);
    const serverResponseAfterSuccesMint = await makeFetchReqToMint();
    setIsLoaded(true);
    redirectToInfoCollection(serverResponseAfterSuccesMint);
  };

  const rarityIsEmpty = () => mintParams.rarities === "";

  const makeFetchReqToMint = async () => {
    return apiCall.post(global_urls.MINTING_TOKEN_URL, mintParams);
  };

  const redirectToInfoCollection = (dataForView) =>
    mintNavigate(
      `/tokens-data-info/${mintParams.contractName}/${mintParams.rootAddress}`,
      { state: dataForView }
    );

  const getInfoFromServerToMint = () => {
    apiCall
      .post(global_urls.MINTING_INFORMATION_URL, {
        colName: urlParams.collectionName,
        colAdd: urlParams.collectionAddress,
      })
      .then((data) => {
        console.log("DATA FORM SERVER: ", data);
        
        setInfoFromServerToMint(data);
        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(getInfoFromServerToMint, [
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
            rarities={infoFromServerToMint.collectionInfo.rarities}
            setRarity={setMintParams}
            mintParams={mintParams}
          />
          <ParamsField
            variables={infoFromServerToMint.collectionInfo.variables}
            setParam={setMintParams}
            mintParams={mintParams}
          />
          <EnumField
            enums={infoFromServerToMint.collectionInfo.enums}
            setParam={setMintParams}
            mintParams={mintParams}
          ></EnumField>
          <SignField signFieldChange={setMintParams} mintParams={mintParams} />
          <button className="MintingTokensFormBtn btn btn-blue">
            <div>
              <i className="fas fa-plus"></i>
              Minting
            </div>
          </button>
        </form>
      ) : (
        <PagePreloader />
      )}
    </div>
  );
};

export default MintingTokensForm;
