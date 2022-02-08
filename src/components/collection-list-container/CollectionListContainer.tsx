import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";

import PagePreloader from "../common/page-preloader/PagePreloader";
import CollectionListItem from "../collection-list-item/CollectionItem";
import { Context } from "../..";

const CollectionListContainer = () => {
  const { collectionListStore } = useContext(Context);

  useEffect(() => {
    collectionListStore.setCollectionList();
  }, []);

  const collections = collectionListStore.collectionList?.map(
    (collection, idx) => <CollectionListItem key={idx} {...collection} />
  );

  const getContent = () => {
    return collections ? collections : <h1>There are no collections yet.</h1>;
  };

  const errorMessage = collectionListStore.error ? (
    <h1>Error. Please reload page or log in again.</h1>
  ) : null;
  const preloader = collectionListStore.isLoading ? <PagePreloader /> : null;
  const content = !(collectionListStore.error || collectionListStore.isLoading)
    ? getContent()
    : null;

  return (
    <div className="container">
      {errorMessage}
      {preloader}
      {content}
    </div>
  );
};

export default observer(CollectionListContainer);
