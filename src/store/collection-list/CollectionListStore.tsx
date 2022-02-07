import { makeAutoObservable } from "mobx";
import CollectionListService from "../../services/CollectionListService";
import ICollectionItem from "../../models/CollectionItem";

export default class CollectionListStore {
  collectionList?: ICollectionItem[] = [];
  isLoading: boolean = true;
  error: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  getCollectionList = async () => {
    try {
      const collections = await CollectionListService.getCollectionList();
      return collections.data;
    } catch (error) {
      this.onError();
      console.log(error);
    } finally {
      this.changeDataIsLoadingTo(false);
    }
  };

  setCollectionList = async () => {
    this.changeDataIsLoadingTo(true);
    try {
      this.collectionList = await this.getCollectionList();
    } catch (error) {
      console.log(error);
    }
  };

  changeDataIsLoadingTo = (dataIsLoaded: boolean) => {
    this.isLoading = dataIsLoaded;
  };

  onError = () => {
    this.error = true;
    this.isLoading = false;
  };
}
