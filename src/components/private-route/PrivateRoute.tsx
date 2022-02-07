import { observer } from "mobx-react";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Context } from "../..";

const PrivateRoute = ({ children }) => {
  const { userStore } = useContext(Context);

  let location = useLocation();
  
  if (!userStore.isAuthenticated() && !localStorage.getItem("accessToken")) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default observer(PrivateRoute);
