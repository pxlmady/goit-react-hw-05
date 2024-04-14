import React from "react";
import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";
const NotFoundPage = () => {
  return (
    <div>
      <h2 className={css.notFoundPageTitle}>Page not found!</h2>
      <p className={css.notFoundPageText}>
        {" "}
        Sorry, but the page you were trying to view does not exist.
      </p>
      <Link className={css.link} to="/">
        Back to homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
