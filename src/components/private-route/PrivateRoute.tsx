import { Navigate } from "react-router-dom";
import { user } from "../../store/user/UserStore";

const PrivateRoute = ({ children }) => {
  console.log(user.isAuthenticated());
  
  if (user.isAuthenticated()) {
    return children;
  } else {
    // TODO: make the notification to logins
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
