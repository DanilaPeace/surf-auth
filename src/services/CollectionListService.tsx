import { AxiosResponse } from "axios";

import { global_urls } from "../config/urls";
import api from "../http/auth-api";
import ICollectionItem from "../models/CollectionItem";

export default class CollectionListService {
  static async getCollectionList(): Promise<AxiosResponse<ICollectionItem[]>> {
    return api.get<ICollectionItem[]>(global_urls.COLLECTION_LIST_URL);
  }
}
