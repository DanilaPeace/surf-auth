import { SyntheticEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

type ServerMintingResponse = {
    collectionInfo: any,
    collectionName: string,
    collecitonRootAddress: string
}

const ParamsField = () => {
    return (
        <div className="MediafileField">

        </div>
    )
}

const RaritiesField = () => {
    return (
        <div className="MediafileField">

        </div>
    )
}

const EnumField = () => {
    return (
        <div className="MediafileField">

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

    const params = useParams();

    const getMintingInfo = () => {
        (fetch('http://localhost:4001/minting-tokens', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:
                JSON.stringify({
                    colName: params.collectionName,
                    colAdd: params.collectionAddress
                })
        }))
            .then(res => res.json())
            .then(data => {
                setMintingData(data)
            })
            .catch(error => console.log(error));
    }

    useEffect(getMintingInfo, [params.collectionAddress, params.collectionName]);

    const onHandleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData();
        // console.log(data);
        // console.log(event.target);
        // console.log(event.target.elements);
        console.log(event.target.rarities.value);
        console.log(event.target["enum-items-select"].value);
    }

    // console.log(mintingData)

    return (
        <div className="container">
            {
                mintingData.collectionInfo.collection ?
                    (
                        <form onSubmit={onHandleSubmit} method="post" className="main-form">
                            {/* {console.log(mintingData.collectionInfo)} */}
                            Rarities
                            <select className="form-select" name="rarities" id="rarities">
                                {mintingData.collectionInfo.collection.rarities.map(rarity => {
                                    return <option>{rarity.name}</option>
                                })}
                            </select>


                            {mintingData.collectionInfo.collection.parameters ?
                                (
                                    <div>
                                        "Parameters"
                                        {
                                            mintingData.collectionInfo.collection.parameters.map(parameter => {
                                                return (
                                                    <div className="parameter">
                                                        <div className="parameter-title">
                                                            {parameter.name}
                                                        </div>
                                                        <input className="form-control user-input" type="text" name={parameter.name} id="" />
                                                    </div>)
                                            })}
                                    </div>
                                ) : ""
                            }

                            {mintingData.collectionInfo.enums ?
                                (

                                    <div>
                                        {mintingData.collectionInfo.enums.map(enumItem => {
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
                                ) : ""
                            }

                            <button className="btn btn-blue">Submit</button>
                        </form>
                    ) : ''
            }
        </div>
    );
}

export default MintingTokensForm;   