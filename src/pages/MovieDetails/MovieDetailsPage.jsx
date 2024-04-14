import { React, useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import css from "./MovieDetailsPage.module.css";
import { requestMovieDetails } from "../../services/HTTPRequest";
import Loader from "../../components/Loader";
import { toast } from "react-hot-toast";
const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/movies");
  const [movieDetails, setMovieDetails] = useState(null);
  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const data = await requestMovieDetails(movieId);
        setMovieDetails(data);
        setIsLoading(true);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovieDetails();
  }, [movieId]);
  return (
    <div>
      <Link className={css.backLink} to={backLinkRef.current}>
        Go back
      </Link>
      {isLoading && <Loader />}
      {isError &&
        toast("Sorry, there are some problems. Please try reloading the page!")}
      {movieDetails && (
        <div className={css.movieCard}>
          <img
            className={css.movieCardImage}
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            alt={`Movie poster for ${movieDetails.original_title}`}
          />
          <ul className={css.movieCardFeatures}>
            <li className={css.movieCardFeatureItem}>
              <h3 className={css.movieTitle}>{movieDetails.original_title}</h3>
              <p className={css.movieFeatureDescription}>
                User score: {Math.round(movieDetails.vote_average * 10)}%
              </p>
            </li>
            <li className={css.movieCardFeatureItem}>
              <h4 className={css.movieFeatureTitle}>Overview</h4>
              <p className={css.movieFeatureDescription}>
                {movieDetails.overview ?? "no overview yet"}
              </p>
            </li>
            <li className={css.movieCardFeatureItem}>
              <h4 className={css.movieFeatureTitle}>Genre</h4>
              <p className={css.movieFeatureDescription}>
                {movieDetails.genres.map((genre) => genre.name).join(", ")}
              </p>
            </li>
          </ul>
        </div>
      )}
      <h4 className={css.additionalInfoTitle}>Additional information</h4>
      <ul className={css.additionalInfoList}>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
