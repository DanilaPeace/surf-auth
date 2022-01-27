import { useEffect } from "react";
import { observer } from "mobx-react-lite";

import PagePreloader from "../common/page-preloader/PagePreloader";
import CollectionListItem from "../collection-list-item/CollectionListItem";
import CollectionListStore from "../../store/CollectionListStore";

const store = new CollectionListStore();

const CollectionListContainer = observer(() => {
  useEffect(() => {
    store.setCollectionList();
  }, []);

  const collections = store.collectionList?.map((collection, idx) => (
    <CollectionListItem key={idx} {...collection} />
  ));

  return (
    <div className="container">
      {store.dataIsLoaded ? collections : <PagePreloader />}
    </div>
  );
});

export default CollectionListContainer;
