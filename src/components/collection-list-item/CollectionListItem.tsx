import { useNavigate } from 'react-router-dom';
import './collection-list-item.css';
import { Link } from "react-router-dom";

const CollectionListItem = ({address, name}) => {
    let navigate = useNavigate();
    const transitionInfoRoot = () => {
        navigate(`/tokens-data-info/${name}/${address}`);
    }
    return (
        <div className="CollectionListItem main-form">
            <div className="CollectionListItem-content">
                <div className="CollectionListItem-row">
                    <div className="CollectionListItem-col col-2">
                        Collection: 
                    </div>
                    <div className="CollectionListItem-col">
                        {name}
                    </div>
                </div>
                <div className="CollectionListItem-row">
                    <div className="CollectionListItem-col col-2">
                        Address:
                    </div>
                    <div className="CollectionListItem-col">
                        {address}
                    </div>
                </div>
            </div>
            <div className="CollectionListItem-btns">
            <button className="CollectionListItem-btn btn btn-blue">
                <Link to={`/minting-tokens/${name}/${address}`}>
                    <i className="far fa-plus-square"></i>
                    Minting token
                </Link>
            </button>
                <button className="CollectionListItem-btn btn btn-outline" onClick={transitionInfoRoot}>
                    <i className="fas fa-info-circle"></i>
                    Info Root
                </button>
            </div>
        </div>
    )
}
// navigate(`/tokens-data-info/${data.collectionName}/${data.rootNftAddress}`, { state: {data:data} });

export default CollectionListItem;