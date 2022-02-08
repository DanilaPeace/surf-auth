import { observer } from "mobx-react";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Context } from "../..";

const PrivateRoute = ({ children }) => {
  const { userStore } = useContext(Context);
  const location = useLocation();
  
  if (!userStore.isAuthenticated()) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  return children;
};

export default observer(PrivateRoute);
