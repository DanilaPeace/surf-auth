import React, {
  FC,
  MouseEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";
import { observer } from "mobx-react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProviderRpcClient } from "ton-inpage-provider";
import QRCode from "react-qr-code";

import { Context } from "../..";
import PagePreloader from "../../components/common/page-preloader/PagePreloader";
import Modal from "../../components/Modal/Modal";
import "./signin.scss";

import { io } from "socket.io-client";
const ENDPOINT = "http://localhost:4000";

interface LocationState {
  from: {
    pathname: string;
  };
}

const SignIn: FC = () => {
  const { userStore } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  const [modalActive, setModalActive] = useState<boolean>(false);
  let from = (location.state as LocationState)?.from.pathname || "/";

  const socket = io(ENDPOINT, {
    path: "/auth/debot-auth",
    transports: ["websocket"],
  });
  useEffect(() => {
    socket.on("authData", async (data) => {
      await userStore.surfLogin(data);
    });

    // CLEAN UP THE EFFECT
    return () => {
      socket.disconnect();
    };
  }, []);

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

  const onEverSignClick: MouseEventHandler = async () => {
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

  const onSurfSignClick: MouseEventHandler = async () => {
    try {
      await userStore.setDataForAuth();
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
            <button className="btn btn-blue" onClick={onEverSignClick}>
              Sign with EVER Wallet
            </button>
            <button className="btn btn-blue" onClick={onSurfSignClick}>
              Sign with SURF
            </button>
          </div>
          <Modal active={modalActive} setActive={setModalActive}>
            <div className="signin__modal">
              <QRCode value={userStore.qrValue} />
              <a
                onClick={() => setModalActive(false)}
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
