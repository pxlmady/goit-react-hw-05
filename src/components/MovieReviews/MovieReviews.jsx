import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { requestMovieReviews } from "../../services/HTTPRequest";
import Loader from "../Loader";
import { toast } from "react-hot-toast";
import css from "./MovieReview.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchMovieReviews() {
      setIsLoading(true);
      try {
        const data = await requestMovieReviews(movieId);
        if (data.results && data.results.length > 0) {
          setMovieReviews(data.results);
        } else {
          setMovieReviews([]);
        }
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovieReviews();
  }, [movieId]);

  return (
    <div>
      {isLoading && <Loader />}
      {isError &&
        toast("Sorry, there are some problems. Please try reloading the page!")}
      {movieReviews && movieReviews.length > 0 ? (
        <ul className={css.reviewList}>
          {movieReviews.map((review) => (
            <li className={css.reviewItem} key={review.id}>
              <h5>{review.author}</h5>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        !isLoading && <p>We don&apos;t have any reviews for this movie</p>
      )}
    </div>
  );
};

export default MovieReviews;
