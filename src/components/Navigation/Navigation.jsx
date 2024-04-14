import React from "react";
import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";
import { FaFilm } from "react-icons/fa";
import { FaHome } from "react-icons/fa";

const Navigation = () => {
  return (
    <nav className={css.navigationContainer}>
      <NavLink
        className={({ isActive }) =>
          clsx(css.navLink, { [css.active]: isActive })
        }
        to="/">
        <FaHome className={css.iconFilm} />
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          clsx(css.navLink, { [css.active]: isActive })
        }
        to="/movies">
        Movies <FaFilm className={css.icon} /> 
      </NavLink>
    </nav>
  );
};

export default Navigation;
