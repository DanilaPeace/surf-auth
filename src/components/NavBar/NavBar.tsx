import { Link } from 'react-router-dom';
import { ReactComponent as HomeLogo } from './home-logo.svg' 
import './navbar.css';

function NavBar() {
    return (
        <nav className="nav">
            <ul className="nav__list">
                <li className="nav__item">
                    <Link className="nav__link" to="/">
                       <HomeLogo />
                    </Link>
                </li>
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
            </ul>
        </nav>
    );
}

export default NavBar;