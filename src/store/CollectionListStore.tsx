import { makeAutoObservable } from "mobx";
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
    makeAutoObservable(this);
  }

  getCollectionList = async () => {
    this.changeDataIsLoaded(false);
    try {
      const collections = await CollectionListService.getCollectionList();
      return collections.data.collectionList;
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
