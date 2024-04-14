import axios from "axios";

const windowTime = "week";
const instance = axios.create({
  baseURL: `https://api.themoviedb.org/3/`,
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZmFjMGZkMTQwODczMmYwZWY5NGY5NmQyMWVlOWMyMiIsInN1YiI6IjY2MGVmZWYxYTg4NTg3MDE0OWU1YjVjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LxY_Mlj7kw4jy9rS6xreCcekqZus-I2OHe0i40AT6Yo",
    accept: "application/json",
  },
});

export const photoPerPage = 12;

export async function requestTrendingMovies() {
  const { data } = await instance.get(
    `trending/movie/${windowTime}?language=en-US`
  );
  return data;
}

export async function requestMovieDetails(movieId) {
  const { data } = await instance.get(`movie/${movieId}?language=en-US`);
  return data;
}
export async function requestMoviesByQuery(query, page) {
  const { data } = await instance.get(
    `search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`
  );
  return data;
}
export async function requestMovieReviews(movieId) {
  const { data } = await instance.get(
    `movie/${movieId}/reviews?language=en-US&page=1`
  );
  return data;
}
export async function requestMovieCredits(movieId) {
  const { data } = await instance.get(
    `movie/${movieId}/credits?language=en-US`
  );
  return data;
}
