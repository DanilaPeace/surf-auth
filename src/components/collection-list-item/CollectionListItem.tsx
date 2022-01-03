import { Link } from "react-router-dom";
import "./collection-list-item.css";

const CollectionListItem = ({ address, name }) => {
  return (
    <div className="CollectionListItem main-form">
      <div className="CollectionListItem-content">
        <div className="CollectionListItem-row">
          <div className="CollectionListItem-col col-2">Collection:</div>
          <div className="CollectionListItem-col">{name}</div>
        </div>
        <div className="CollectionListItem-row">
          <div className="CollectionListItem-col col-2">Address:</div>
          <div className="CollectionListItem-col">{address}</div>
        </div>
      </div>
      <div className="CollectionListItem-btns">
        <button className="CollectionListItem-btn btn btn-blue">
          <Link to={`/minting-tokens/${name}/${address}`}>
            <i className="far fa-plus-square"></i>
            Minting token
          </Link>
        </button>
        <button className="CollectionListItem-btn btn btn-outline">
          <i className="fas fa-info-circle"></i>
          Info Root
        </button>
      </div>
    </div>
  );
};

export default CollectionListItem;
