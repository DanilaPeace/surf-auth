import { useEffect } from "react";

import PagePreloader from "../common/page-preloader/PagePreloader";
import CollectionListItem from "../collection-list-item/CollectionListItem";
import CollectionListStore from "../../store/CollectionListStore";
import { observer } from "mobx-react-lite";

const store = new CollectionListStore();

const CollectionListContainer = observer(() => {
  useEffect(() => {
    store.changeDataIsLoaded(false);
    store.setCollectionList().then(() => store.changeDataIsLoaded(true));
  }, []);

  const collections = store.collectionList.map((collection, idx) => (
    <CollectionListItem key={idx} {...collection} />
  ));

  return (
    <div className="CollectionListContainer container">
      {store.dataIsLoaded ? collections : <PagePreloader />}
    </div>
  );
});

export default CollectionListContainer;
