import {Link, NavLink} from "react-router-dom";

import './appHeader.scss';

const AppHeader = () => {
  return (
    <header className="header">
      <h1 className="header__title">
        <Link to="/">
          <span className="header__title_span-marvel">Marvel</span> information portal
        </Link>
      </h1>
      <nav className="header__menu">
        <ul className="header__menu-links">
          <li className="header__menu-list-item"><NavLink end className={({isActive}) => '' + (isActive ? "header__menu-link" : "")} to="/">Characters</NavLink></li>
          /
          <li className="header__menu-list-item"><NavLink className={({isActive}) => '' + (isActive ? "header__menu-link" : "")} to="/comics">Comics</NavLink></li>
        </ul> 
      </nav>
    </header>
  )
}

export default AppHeader;