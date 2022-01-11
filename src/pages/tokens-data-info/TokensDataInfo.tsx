import React, { useEffect, useLayoutEffect, useState } from "react";
import { render } from "react-dom";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./tokens-data-info.css";
interface stateType {
  from: { pathname: JSON };
}
type ServerTokenDataint = {
  rootAddress: string;
  rootNftName: string;
  tokensData: any;
};

//class TokensDataInfo extends React.Component {
const TokensDataInfo = () => {
  let navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [tokens, setTokens] = useState<ServerTokenDataint>({
    rootAddress: "",
    rootNftName: "",
    tokensData: {},
  });

  const params = useParams();
  console.log(params.collectionName, params.collectionAddress);

  const getTokensInfo = () => {
    setIsLoaded(false);
    let url =
      `http://localhost:4001/collection-list/tokens-data-info?rootNftAddress=${params.collectionAddress}`;
    let response = fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTokens(data);
        setIsLoaded(true);
      })
      .catch((error) => console.log(error));
  };
  useEffect(getTokensInfo, []);


  const tokenInfo = async (e) => {
    e.preventDefault() 
    console.log(e.target.textContent)
    navigate(`/one-token-info/${e.target.textContent}`);
  }
  return (
    <div className="container">
      <div className="tokens-data-box-main row-info-coll">
        <div className="row">
          <div className="col-4">
            <p className="text text-main">Root address: </p>
          </div>
          <div className="col-8">
            <p className="text">{params.collectionAddress}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <p className="text text-main">Collection name: </p>
          </div>
          <div className="col-8">
            <p className="text">{params.collectionName}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <p className="text text-main">
              List of data tokens on this root address:{" "}
            </p>
            <ul>
              {isLoaded
                ? tokens.tokensData.map((token) => {
                  return <li onClick={tokenInfo}>{token.id} </li> 
                  })
                : ""}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokensDataInfo;
function state(arg0: string, state: any, any: unknown) {
  throw new Error("Function not implemented.");
}
