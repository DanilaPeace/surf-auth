import { ProviderRpcClient } from "ton-inpage-provider";

import apiCall from "../api/CallApi";
import { global_urls } from "../config/urls";

const getUserData = async () => {
  const ton = new ProviderRpcClient();
  try {
    if (!(await ton.hasProvider())) {
      throw new Error("Extension is not installed");
    }

    await ton.ensureInitialized();

    const { accountInteraction: userDataFromBrowser } =
      await ton.requestPermissions({
        permissions: ["tonClient", "accountInteraction"],
      });
    if (userDataFromBrowser == null) {
      throw new Error("Insufficient permissions");
    }

    ton.disconnect();
    return userDataFromBrowser;
  } catch (error) {
    console.error(error);
  }
};

export default class AuthService {
  static login = async () => {
    const userDataFromBrowser = await getUserData();
    return await apiCall.post(global_urls.USER_AUTH, {
      address: userDataFromBrowser?.address.toString(),
      publicKey: userDataFromBrowser?.publicKey,
    });
  };

  static logout = async () => {
    return await apiCall.post('/logout', {});
  };
}
