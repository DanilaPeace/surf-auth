import { action, makeObservable, observable } from "mobx";
import CollectionListService from "../services/CollectionListService";

interface CollectionItem {
  address: string;
  icon: string;
  name: string;
}

export default class CollectionListStore {
  collectionList?: CollectionItem[] = [];
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
    this.changeDataIsLoaded(false);
    try {
      const collectoins = await CollectionListService.getCollectionList();
      return collectoins.data.collectionList;
    } catch (error) {
      console.log(error);
    } finally {
      this.changeDataIsLoaded(true);
    }
  };

  setCollectionList = async () => {
    try {
      this.collectionList = await this.getCollectionList();
    } catch (error) {
      console.log(error);
    }
  };

  changeDataIsLoaded = (dataIsLoaded: boolean) => {
    this.dataIsLoaded = dataIsLoaded;
  };
}
