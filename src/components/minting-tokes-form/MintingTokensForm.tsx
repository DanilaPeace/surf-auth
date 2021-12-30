import { SyntheticEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { global_urls } from "../../config/urls";

type ServerMintingResponse = {
    collectionInfo: any,
    collectionName: string,
    collecitonRootAddress: string
}

const ParamsField = ({ variables }) => {
    return (
        <div className="ParamsField">
            Parameters
            {
                variables.map(parameter => {
                    return (
                        <div className="parameter">
                            <div className="parameter-title">
                                {parameter.name}
                            </div>
                            <input className="form-control user-input" type="text" name={parameter.name} id="" />
                        </div>)
                })}
        </div>
    )
}

const RaritiesField = ({ rarities }) => {
    return (
        <div className="RaritiesField">
            Rarities
            <select className="form-select" name="rarities" id="rarities">
                {rarities.map(rarity => {
                    return <option>{rarity.name}</option>
                })}
            </select>
        </div>
    )
}

const EnumField = ({ enums }) => {
    return (
        <div className="EnumField">
            {enums.map(enumItem => {
                return (<div className="enum-item-container">
                    <div className="enum-item-name">
                        {enumItem.name}
                    </div>
                    <select name="enum-items-select" className="form-select" id="">
                        {enumItem.enumVariants.map(variant => {
                            return (
                                <option value={variant}>{variant}</option>
                            )
                        })}
                    </select>
                </div>)
            })}
        </div>
    )
}

const MediafileField = () => {
    return (
        <div className="MediafileField">

        </div>
    )
}

const MintingTokensForm = (props) => {
    const [mintingData, setMintingData] = useState<ServerMintingResponse>({
        collectionInfo: {},
        collectionName: '',
        collecitonRootAddress: ''
    });

    const [isLoaded, setIsLoaded] = useState(false);

    const [signIsChecked, setSing] = useState(false);

    const params = useParams();

    const getMintingInfo = () => {
        /*
            TODO: 
                1. CHANGE A NAME OF THIS FUNCTION 
        */
        fetch(global_urls.MINTING_INFORMATION_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:
                JSON.stringify({
                    colName: params.collectionName,
                    colAdd: params.collectionAddress
                })
        })
            .then(res => res.json())
            .then(data => {
                setMintingData(data);
                setIsLoaded(!isLoaded);
                console.log(data)
            })
            .catch(error => error);
    }

    useEffect(getMintingInfo, [params.collectionAddress, params.collectionName]);

    const onHandleSubmit = (event) => {
        event.preventDefault();
        /*
            TODO: 
                1. MAKE FUNCTION OT CREATE A PARAMS FOR MINTING
                2. REDIRECT TO THE INFORMATINO ABOUT COLLECTION PAGE
                3. Смотреть видео про запрос на сервер с коктелями 
        */
        const testMintingParams = {
            rootAddress: params.collectionAddress,
            contractName: params.collectionName,
            url: "",
            editionNumber: 1,
            editionAmount: 1,
            managersList: [],
            royalty: 1,
            rarities: "Collection",
            attack: 5,
            info: "info nft",
            seedPhrase: "",
            signAddress: ""
        }

        fetch(global_urls.MINTING_TOKEN_URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(testMintingParams)
        })
            .then(res => res.json())
            .then(data => console.log("DATA: ", data))
            .catch(err => console.log(err));
    }



    return (
            /*
            TODO:
            1. make more readable of this component
            */
        <div className="container">
            {
                isLoaded ?
                    (
                        <form onSubmit={onHandleSubmit} method="post" className="main-form">

                            {mintingData.collectionInfo.rarities ? <RaritiesField rarities={mintingData.collectionInfo.rarities} /> : 'THERE IS NO RARITIES'}
                            {mintingData.collectionInfo.variables ? <ParamsField variables={mintingData.collectionInfo.variables} /> : 'THERE IS NO PARAMS'}
                            {mintingData.collectionInfo.enums ? <EnumField enums={mintingData.collectionInfo.enums} /> : "THERE IS NO ENUMS"}
                            <div className="sign-block">
                                <input type="checkbox" name="sign-block-checkbox" onChange={() => setSing(!signIsChecked)} />
                                <div className={"sing-block-inputs " + signIsChecked ? ' active' : ''}>

                                </div>
                            </div>

                            <button className="btn btn-blue">Submit</button>
                        </form>
                    ) : 'NOTHING'
            }
        </div>
    );
}

export default MintingTokensForm;   