import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../..";

const PrivateRoute = ({ children }) => {
  const { userStore } = useContext(Context);

  if (userStore.isAuthenticated()) {
    return children;
  } else {
    // TODO: make the notification to logins
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
