import React from "react";
import { Link } from "react-router-dom";
import './Header.css'

const Header = () => {
  return (
    <nav className="toy-navbar">
      <ul className="navbar-nav">
        <li>
          <Link to={"/"} className="nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link to={"/dashboard"} className="nav-link">
            Dashboard
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
