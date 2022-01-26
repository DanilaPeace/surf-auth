import React from "react";
import { ProviderRpcClient } from "ton-inpage-provider";

import apiCall from "../../api/CallApi";
import { global_urls } from "../../config/urls";
import { user } from "../../store/user/UserStore";

const ton = new ProviderRpcClient();

interface IUser {
  address: string;
  publicKey: string;
}

interface AuthResponse {
  success: boolean;
  data: IUser;
  token: string;
}

const SignIn = () => {
  const onSignClick = async (event) => {
    event.preventDefault();

    if (!(await ton.hasProvider())) {
      throw new Error("Extension is not installed");
    }

    await ton.ensureInitialized();

    const { accountInteraction } = await ton.requestPermissions({
      permissions: ["tonClient", "accountInteraction"],
    });
    if (accountInteraction == null) {
      throw new Error("Insufficient permissions");
    }

    // Получили данные от расширения и отправили их на сервер
    // С сервера мы получили данные о том есть ли пользователь у нас или нет
    // !От сервера нужно получить !ТОКЕН!

    //
    // После нужно изменить данные в хранилище для юзера
    //

    // После помещаем в локальное хранилище токен
    const testDataUser = {
      address: accountInteraction.address.toString(),
      publicKey: accountInteraction.publicKey,
    };

    const serverResponse = await apiCall.post(global_urls.USER_AUTH, testDataUser);
    console.log("USER RESP: ", serverResponse);

    // const response = await fetch(global_urls.USER_AUTH, {
    //   method: "POST",
    //   body: JSON.stringify(testDataUser),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then(res => res.json())
    //   .then((data) => console.log("DATA: ", data))
    //   .catch(console.log);
    // console.log("RESPONS: ", response.json());

    localStorage.setItem("token", "DATA FROM SERVER");

    ton.disconnect();

    user.logIn();
  };

  return (
    <div>
      <button className="btn btn-blue" onClick={onSignClick}>
        Sign with EVER Wallet
      </button>
    </div>
  );
};

export default SignIn;
