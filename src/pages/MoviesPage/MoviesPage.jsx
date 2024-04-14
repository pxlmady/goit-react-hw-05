import { React, useState, useEffect } from "react";
import css from "./MoviesPage.module.css";
import { toast } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { requestMoviesByQuery } from "../../services/HTTPRequest";
import Loader from "../../components/Loader";
import LoadMoreButton from "../../components/Pagination/PaginationButtons";
import MovieList from "../../components/MovieList/MovieList";
import PaginationButtons from "../../components/Pagination/PaginationButtons";
const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [totalPageNumber, setTotalPageNumber] = useState(0);
  const query = searchParams.get("query");
  const page = searchParams.get("page");
  let nextPage = 0;
  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.elements.search.value.trim() === "") {
      toast.error("Please enter search term!");
      return;
    } else {
      setSearchParams({ query: event.target.elements.search.value, page: 1 });
      setTotalPageNumber(0);
      setMovies(null);
    }
  };
  const onSetPageNumber = (number) => {
    if (page !== null && page !== undefined) {
      switch (number) {
        case 1:
          setSearchParams({ query, page: 1 });

          break;
        case 2:
          nextPage = parseInt(page, 10) - 1;
          setSearchParams({ query, page: nextPage });

          break;
        case 3:
          nextPage = parseInt(page, 10) + 1;
          setSearchParams({ query, page: nextPage });

          break;
        case 4:
          setSearchParams({ query, page: totalPageNumber });
          break;
        default:
          setSearchParams({ query, page: 1 });

          break;
      }
    }
  };

  useEffect(() => {
    if (query === null) return;

    async function fetchMoviesByQuery() {
      try {
        setIsLoading(true);
        const data = await requestMoviesByQuery(query, page);

        setTotalPageNumber(data.total_pages);
        if (data.results && data.results.length > 0) {
          setMovies(data.results);
        } else {
          toast(
            "Sorry, there are no movie matching your search query. Please try again with anover search term!"
          );
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMoviesByQuery();
  }, [query, page]);
  return (
    <div>
      <form className={css.searchBar} onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          name="search"
        />
        <button type="submit">Search</button>
      </form>
      {isLoading && <Loader />}
      {isError &&
        toast("Sorry, there are some problems. Please try reloading the page!")}
      {totalPageNumber >= 1 && (
        <p className={css.pageNumber}>
          Page {page} of {totalPageNumber}
        </p>
      )}
      {Array.isArray(movies) && <MovieList listOfMovies={movies} />}
      {totalPageNumber > 1 && (
        <PaginationButtons
          onPageChange={onSetPageNumber}
          pageNumber={page}
          totalPages={totalPageNumber}
        />
      )}
    </div>
  );
};

export default MoviesPage;
