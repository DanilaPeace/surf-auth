import { useEffect, useState } from "react";
import CollectionListItem from "../collection-list-item/CollectionListItem";

import { global_urls } from "../../config/urls";
import PagePreloader from "../common/page-preloader/PagePreloader";

const CollectionListContainer = () => {
  const [collectionList, setCollectionList] = useState([]);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);

  const getCollectionListFromServer = () => {
    fetch(global_urls.COLLECTION_LIST_URL)
      .then((res) => res.json())
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
