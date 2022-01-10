import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ParamsField from "./ParamsField";
import RaritiesField from "./RaritiesField";
import SignField from "./SignField";
import PagePreloader from "../common/page-preloader/PagePreloader";

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

  const [infoFromServerToMint, setInfoFromServerToMint] =
    useState<ServerMintingResponse>({
      collectionInfo: {},
      collectionName: "",
      collecitonRootAddress: "",
    });
  const [isLoaded, setIsLoaded] = useState(false);
  const [mintParams, setMintParams] = useState(defaultParamsForMint);
  const mintNavigate = useNavigate();

  const onHadleSubmit = async (event) => {
    event.preventDefault();
    if (!rarityIsSelect()) {
      // When user didn't select the rarity for token
      alert("Please select the rarity for the creating token!");
      return;
    }
    // For view preloader
    setIsLoaded(false);
    const serverResponseAfterSuccesMint = await makeFetchReqToMint();
    setIsLoaded(true);
    redirectToInfoCollection(serverResponseAfterSuccesMint);
  };

  const rarityIsSelect = () => mintParams.hasOwnProperty("rarities");

  const makeFetchReqToMint = async () => {
    const serverResponseAfterSuccesMint = await fetch(
      global_urls.MINTING_TOKEN_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mintParams),
      }
    )
      .then((res) => res.json())
      .catch((err) => console.error(err));

    return serverResponseAfterSuccesMint;
  };

  const redirectToInfoCollection = (dataForView) =>
    mintNavigate("/tokens-data-info", { state: dataForView });

  const getInfoFromServerToMint = () => {
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
        setInfoFromServerToMint(data);
        setIsLoaded(true);
      })
      .catch((error) => error);
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
