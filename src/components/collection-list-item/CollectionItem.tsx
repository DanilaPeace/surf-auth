import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./collection-list-item.css";

import ICollectionItem from "../../models/CollectionItem";
import { FC } from "react";

const CollectionItem: FC<ICollectionItem> = ({ address, name }) => {
  let navigate = useNavigate();
  const transitionInfoRoot = () => {
    navigate(`/tokens-data-info/${name}/${address}`);
  };

  return (
    <div className="CollectionListItem main-form">
      <div>
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
        <button className="CollectionListBtn btn btn-blue">
          <Link to={`/minting-tokens/${name}/${address}`}>
            <i className="far fa-plus-square"></i>
            Minting token
          </Link>
        </button>
        <button
          className="CollectionListBtn btn btn-outline"
          onClick={transitionInfoRoot}
        >
          <i className="fas fa-info-circle"></i>
          Info Root
        </button>
      </div>
    </div>
  );
};

export default CollectionItem;
