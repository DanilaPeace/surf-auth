import { observer } from "mobx-react";
import React, { FC, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProviderRpcClient } from "ton-inpage-provider";
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
  const from = (location.state as LocationState)?.from || "/";

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

  return (
    <div>
      <button className="btn btn-blue" onClick={onSignClick}>
        Sign with EVER Wallet
      </button>
    </div>
  );
};

export default observer(SignIn);
