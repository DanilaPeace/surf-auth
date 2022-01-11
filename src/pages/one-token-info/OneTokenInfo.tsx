
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./one-token-info.css";

type ServerTokenInfo = {
  tokenInfo: any;
};
//class TokensDataInfo extends React.Component {
const OneTokenInfo = () => {
  
  const params = useParams();
  
  const [tokenInfoArr, setTokenInfo] = useState<ServerTokenInfo>({
    tokenInfo: {}
  });
  const [isLoaded, setIsLoaded] = useState(false);

  const receiveTokenInfo = () => {
    let response = fetch(`http://localhost:4001/collection-list/token-info?tokenAddress=${params.tokenAddress}`)
    
    .then((res) => res.json())
      .then((data) => {
        
        setTokenInfo(data)
        setIsLoaded(true);
      })
      .catch((error) => console.log(error));
    }
  useEffect(receiveTokenInfo, []);
  
  return (
    <div className="container">
      <div className="tokens-data-box-main row-info-coll">
        {isLoaded 
        ? tokenInfoArr.tokenInfo.map((field) => {
          if (field.tag == "p"){
            return <div className="row">
                <div className = "col-3"><p className="text text-main">{field.title}</p></div>
                <div className = "col-6"><p className="text">{field.value}</p></div>
            </div>
          }else if (field.tag == "img"){
            return <div className="row">
                <div className = "col-3"><p className="text text-main">{field.title}</p></div>
                <div className = "col-6"><img src={field.value} style={{maxWidth: "-webkit-fill-available"}}></img></div>
            </div>
          }else if (field.tag == "video"){
            return <div className="row">
                <div className = "col-3"><p className="text text-main">{field.title}</p></div>
                <div className = "col-6"><video controls src={field.value} style={{maxWidth: "-webkit-fill-available"}}></video></div>
            </div>
          }else if (field.tag == "a"){
            return <div className="row">
                <div className = "col-3"><p className="text text-main">{field.title}</p></div>
                <div className = "col-6"><a href={field.value} target={"_blank"}>{field.value}</a></div>
            </div>
          }
        }): ""}   
      </div>
    </div>
  );
};

export default OneTokenInfo;

