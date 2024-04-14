import React from "react";
import { NavLink, useLocation } from "react-router-dom";
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
                <NavLink
                  state={location}
                  to={`/movies/${movie.id}`}
                  className={css.movieLink}
                >
                  <img
                    className={css.movieCardImage}
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={`Movie poster for ${movie.original_title}`}
                  />
                  {movie.title}
                </NavLink>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default MovieList;
