import { Link } from "react-router-dom";
import { ReactComponent as HomeLogo } from "./home-logo.svg";
import { observer } from "mobx-react";

import { user } from "../../store/user/UserStore";

import "./navbar.css";

const NavBar = observer(() => {
  console.log("NAVBAR IS RERENDERED!!!");

  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <Link className="nav__link" to="/">
            <HomeLogo />
          </Link>
        </li>
        {user.isAuthenticated() && (
          <>
            <li className="nav__item">
              <Link className="nav__link" to="/root-contract-form">
                <span> Root Contract Form </span>
              </Link>
            </li>

            <li className="nav__item">
              <Link className="nav__link" to="/deploy-from-file">
                Deploy From File
              </Link>
            </li>

            <li className="nav__item">
              <Link className="nav__link" to="/collection-list">
                Collection List
              </Link>
            </li>
          </>
        )}
      </ul>

      <div>
        {!user.isAuthenticated() && (
          <Link className="nav__link sign-btn" to="/signin">
            Sign in
          </Link>
        )}
        {user.isAuthenticated() && (
          <button className="sign-btn" onClick={user.logout}>
            Log out
          </button>
        )}
      </div>
    </nav>
  );
});
export default NavBar;
