import { useEffect } from "react";
import { observer } from "mobx-react-lite";

import PagePreloader from "../common/page-preloader/PagePreloader";
import CollectionListItem from "../collection-list-item/CollectionItem";
import CollectionListStore from "../../store/collection-list/CollectionListStore";

const store = new CollectionListStore();

const CollectionListContainer = () => {
  useEffect(() => {
    store.setCollectionList();
  }, []);

  const collections = store.collectionList?.map((collection, idx) => (
    <CollectionListItem key={idx} {...collection} />
  ));

  const getContent = () => {
    return collections ? collections : <h1>There is no collection yet.</h1>;
  };

  const errorMessage = store.error ? (
    <h1>Error. Please reload page or log in again.</h1>
  ) : null;
  const preloader = store.isLoading ? <PagePreloader /> : null;
  const content = !(store.error || store.isLoading) ? getContent() : null;

  return (
    <div className="container">
      {errorMessage}
      {preloader}
      {content}
    </div>
  );
};

export default observer(CollectionListContainer);
