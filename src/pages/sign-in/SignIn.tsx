import { observer } from "mobx-react";
import React, { FC, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProviderRpcClient } from "ton-inpage-provider";
import QRCode from "react-qr-code";

import { Context } from "../..";
import PagePreloader from "../../components/common/page-preloader/PagePreloader";

interface LocationState {
  from: {
    pathname: string;
  };
}

const SignIn: FC = (props) => {
  const { userStore } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  let from = (location.state as LocationState)?.from.pathname || "/";

  const getUserDataFromExtension = async () => {
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

  const onSignClick = async (event) => {
    event.preventDefault();
    try {
      const userDataFromExtension = await getUserDataFromExtension();
      await userStore.login(
        userDataFromExtension!.address.toString(),
        userDataFromExtension!.publicKey
      );
    } catch (error) {
      console.log(error);
    } finally {
      navigate(from);
    }
  };

  if (userStore.isLoading) {
    return <PagePreloader />;
  }

  // const signSerf = () => {

  //   return qrCanvas;
  // }

  return (
    <div className="signin">
      <div className="signin__container container">
        <div className="signin__content">
          <div className="signin__btns">
            <QRCode value="https://uri.ton.surf/debot/0:a7e1c39a6e0d59622f5e5e5d1836eccea86288c3972c15fabad56dafc57e746b?net=devnet&message=te6ccgEBBAEArAADaGIAU_DhzTcGrLEXry8ujBt2Z1QxRGHLlgr9XWq21-K_OjWAAAAAAAAAAAAAAAAAAH9IYB8DAgEASmh0dHA6Ly9sb2NhbGhvc3Q6NDAwMS9hdXRoL2RlYm90LWF1dGgASDg0NzJjMzRlLTA0ZGItNDZmYi05YmQ4LTlkZDk5OGNkOTRjOQBIYWE5NjNmODEtZGUxMy00MDIzLTk0ODItNTNhNGI3YjE4NzBh" />
            <button className="btn btn-blue" onClick={onSignClick}>
              Sign with EVER Wallet
            </button>
            <button className="btn btn-blue">Sing with SURF</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(SignIn);
