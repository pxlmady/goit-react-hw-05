import React from "react";
import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";
const MovieList = ({ listOfMovies }) => {
  const location = useLocation();
  return (
    <div>
      <ul className={css.movieList}>
        {listOfMovies &&
          listOfMovies.map((movie) => {
            return (
              <li key={movie.id}>
                <Link state={location} to={`/movies/${movie.id}`}>
                  {movie.title}
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default MovieList;
