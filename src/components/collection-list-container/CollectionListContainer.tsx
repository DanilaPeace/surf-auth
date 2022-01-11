import { useEffect, useState } from "react";

import { global_urls } from "../../config/urls";
import PagePreloader from "../common/page-preloader/PagePreloader";
import CollectionListItem from "../collection-list-item/CollectionListItem";
import apiCall from "../../api/CallApi";

const CollectionListContainer = () => {
  const [collectionList, setCollectionList] = useState([]);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);

  const getCollectionListFromServer = () => {
    apiCall
      .get(global_urls.COLLECTION_LIST_URL)
      .then((data) => {
        setCollectionList(data.collectionList);
        setDataIsLoaded(true);
      })
      .catch((err) => console.error(err));
  };

  useEffect(getCollectionListFromServer, []);

  const collections = collectionList.map((collection, idx) => (
    <CollectionListItem key={idx} {...collection} />
  ));

  return (
    <div className="CollectionListContainer container">
      {dataIsLoaded ? collections : <PagePreloader />}
    </div>
  );
};

export default CollectionListContainer;
