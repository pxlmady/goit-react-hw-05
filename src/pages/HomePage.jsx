import React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import MovieList from "../components/MovieList/MovieList";
import { requestTrendingMovies } from "../services/HTTPRequest";
import Loader from "../components/Loader";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState(null);

  useEffect(() => {
    async function fetchTrendingMovies() {
      try {
        setIsLoading(true);
        const data = await requestTrendingMovies();

        // console.log(data);
        if (data.results && data.results.length > 0) {
          setTrendingMovies(data.results);
        } else {
          toast(
            "Sorry, there are no trending movies at the moment. Please try again with anover search term!"
          );
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTrendingMovies();
  }, []);
  return (
    <div>
      <h2>Trends for week</h2>
      {isLoading && <Loader />}
      {isError &&
        toast("Sorry, there are some problems. Please try reloading the page!")}
      <MovieList listOfMovies={trendingMovies} />
    </div>
  );
};

export default HomePage;
