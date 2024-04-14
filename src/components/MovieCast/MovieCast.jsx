import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { requestMovieCredits } from "../../services/HTTPRequest";
import Loader from "../Loader";
import { toast } from "react-hot-toast";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [movieCredits, setMovieCredits] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchMovieCast() {
      try {
        setIsLoading(true);
        const data = await requestMovieCredits(movieId);
        setMovieCredits(data);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovieCast();
  }, [movieId]);

  return (
    <div>
      {isLoading && <Loader />}
      {isError &&
        toast("Sorry, there are some problems. Please try reloading the page!")}
      <ul className={css.castList}>
        {movieCredits &&
          movieCredits.cast.map((actor) => (
            <li className={css.castItem} key={actor.id}>
              <img
                className={css.castPhoto}
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt={"Photo of " + actor.name + ""}
              />
              <h5>{actor.name}</h5>
              <p>{actor.character}</p>
            </li>
          ))}
        {!isLoading &&
          !isError &&
          movieCredits &&
          movieCredits.cast.length === 0 && (
            <p>We don&apos;t have any cast for this movie</p>
          )}
      </ul>
    </div>
  );
};

export default MovieCast;
