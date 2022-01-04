import { useEffect, useState } from "react";
import CollectionListItem from "../collection-list-item/CollectionListItem";

import { global_urls } from "../../config/urls";

const CollectionListContainer = () => {
  const [collectionList, setCollectionList] = useState([]);

  const getCollectionListFromServer = () => {
    fetch(global_urls.COLLECTION_LIST_URL)
      .then((res) => res.json())
      .then((data) => {
        setCollectionList(data.collectionList);
      })
      .catch((err) => console.error(err));
  };

  useEffect(getCollectionListFromServer, []);

  return (
    <div className="CollectionListContainer container">
      {collectionList.map((collection, idx) => (
        <CollectionListItem key={idx} {...collection} />
      ))}
    </div>
  );
};

export default CollectionListContainer;
