import { observer } from "mobx-react";
import React, { FC, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProviderRpcClient } from "ton-inpage-provider";
import QRCode from "react-qr-code";

import { Context } from "../..";
import PagePreloader from "../../components/common/page-preloader/PagePreloader";
import Modal from "../../components/Modal/Modal";
import "./signin.scss";

interface LocationState {
  from: {
    pathname: string;
  };
}

const SignIn: FC = () => {
  const { userStore } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  const [modalActive, setModalActive] = useState(false);
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

  const onEvenSignClick = async (event) => {
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

  const onSurfSignClick = async () => {
    try {
      await userStore.surfLogin();
      setModalActive(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (userStore.isLoading) {
    return <PagePreloader />;
  }

  return (
    <div className="signin">
      <div className="signin__container container">
        <div className="signin__content">
          <div className="signin__btns">
            <button className="btn btn-blue" onClick={onEvenSignClick}>
              Sign with EVER Wallet
            </button>
            <button className="btn btn-blue" onClick={onSurfSignClick}>
              Sing with SURF
            </button>
          </div>
          <Modal active={modalActive} setActive={setModalActive}>
            <div className="signin__modal">
              <QRCode value={userStore.qrValue} />
              <a
                href={userStore.deepLink}
                className="btn btn-blue"
                rel="noreferrer"
                target="_blank"
              >
                To debot
              </a>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default observer(SignIn);
