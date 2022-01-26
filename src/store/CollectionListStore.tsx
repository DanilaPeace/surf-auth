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
      dataIsLoaded: observable,
      getCollectionList: action,
      setCollectionList: action,
      changeDataIsLoaded: action,
    });
  }

  getCollectionList = async () => {
    if (!this.dataIsLoaded) {
      return await apiCall
        .get(global_urls.COLLECTION_LIST_URL)
        .then((data) => {
          this.changeDataIsLoaded(true);
          return data.collectionList;
        })
    }
  };

  setCollectionList = async () => {
    // To show the preloader
    this.changeDataIsLoaded(false);
    this.collectionList = await this.getCollectionList();
  };

  changeDataIsLoaded = (dataIsLoaded: boolean) => {
    this.dataIsLoaded = dataIsLoaded;
  };
}
