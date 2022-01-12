import { action, makeObservable, observable } from "mobx";
import apiCall from "../api/CallApi";
import { global_urls } from "../config/urls";

interface CollectionItem {
  address: string;
  icon: string;
  name: string;
}

export default class CollectionListStore {
  collectionList: CollectionItem[] = [];
  dataIsLoaded: boolean = false;
  constructor() {
    makeObservable(this, {
      collectionList: observable,
      getCollectionList: action,
      setCollectionList: action,
      dataIsLoaded: observable,
      changeDataIsLoaded: action,
    });
  }

  getCollectionList = async () => {
    return await apiCall
      .get(global_urls.COLLECTION_LIST_URL)
      .then((data) => data.collectionList);
  };

  setCollectionList = async () => {
    if (!this.dataIsLoaded) {
      this.collectionList = await this.getCollectionList();
    }
  };

  changeDataIsLoaded = (dataIsLoaded: boolean) => {
    this.dataIsLoaded = dataIsLoaded;
  };
}
