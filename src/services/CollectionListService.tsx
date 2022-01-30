import { AxiosResponse } from "axios";

import { global_urls } from "../config/urls";
import api from "../http/auth-api";

interface CollectionItem {
  address: string;
  icon: string;
  name: string;
}

interface CollectionList {
  collectionList: CollectionItem[];
}

export default class CollectionListService {
  static async getCollectionList(): Promise<AxiosResponse<CollectionList>> {
    return api.get<CollectionList>(global_urls.COLLECTION_LIST_URL);
  }
}
