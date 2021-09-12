import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <nav className="toy-navbar">
      <ul className="navbar-nav">
        <li>
          <NavLink to={"/"} activeClassName="is-active" className="nav-link">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/dashboard"}
            activeClassName="is-active"
            className="nav-link"
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/joinroom"}
            activeClassName="is-active"
            className="nav-link"
          >
            Join Call
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
