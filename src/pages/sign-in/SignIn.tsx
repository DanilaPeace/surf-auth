import React from "react";
import ton from "ton-inpage-provider";

import { user } from "../../store/user/UserStore";

const SignIn = () => {
  const onSignClick = async (event) => {
    event.preventDefault();

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
    localStorage.setItem("token", "DATA FROM SERVER");

    console.log("ACCOUNT: ", accountInteraction);
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
