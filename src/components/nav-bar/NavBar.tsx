import { useContext } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as HomeLogo } from "./home-logo.svg";
import { observer } from "mobx-react";

import "./navbar.css";
import { Context } from "../..";

const NavBar = () => {
  const { userStore } = useContext(Context);
  const navbarLinks = (
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
  );

  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <Link className="nav__link" to="/">
            <HomeLogo />
          </Link>
        </li>
        {userStore.isAuthenticated() && navbarLinks}
      </ul>

      <div>
        {!userStore.isAuthenticated() ? (
          <Link className="nav__link sign-btn" to="/signin">
            Sign in
          </Link>
        ) : (
          <button className="sign-btn" onClick={userStore.logout}>
            Log out
          </button>
        )}
      </div>
    </nav>
  );
};

export default observer(NavBar);
