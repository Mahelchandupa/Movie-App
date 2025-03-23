export const TBDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_APP_KEY,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_APP_KEY}`,
  },
};

export const fetchPopularMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TBDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TBDB_CONFIG}/discover/movie?sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TBDB_CONFIG.headers,
  });

  if (!response.ok) {
    // @ts-ignore
    throw new Error("Failed to fetch movies", response.statusText);
  }

  const data = await response.json();
  return data.results;
};
