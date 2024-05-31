import { MovieDetails, SearchResults } from '../types';

const BASE_URL = 'https://api.themoviedb.org';
const DEFAULT_TTL = 60 * 60 * 24; // 24 hours
const DEFAULT_PARAMS = {
  include_adult: 'false',
  include_video: 'false',
  sort_by: 'popularity.desc',
  language: 'en-US',
  page: '1',
} as const;

export async function fetchFromMovieDB<T = SearchResults>(url: URL, ttl?: number) {
  const defaultParams = Object.entries(DEFAULT_PARAMS);

  defaultParams.forEach(([key, value]) => {
    if (!url.searchParams.has(key)) {
      url.searchParams.append(key, value);
    }
  });

  const options: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
    next: { revalidate: ttl || DEFAULT_TTL },
  };

  try {
    const res = await fetch(url, options);
    const data = await res.json();
    return data as T;
  } catch (err) {
    console.error(err);
    throw new Error('Failed to fetch data from MovieDB');
  }
}

export async function getUpcomingMovies() {
  const url = new URL('https://api.themoviedb.org/3/movie/upcoming');
  const data = await fetchFromMovieDB(url);
  return data.results;
}

export async function getTopRatedMovies() {
  const url = new URL('/3/movie/top_rated', BASE_URL);
  const data = await fetchFromMovieDB(url);
  return data.results;
}

export async function getPopularMovies() {
  const url = new URL('/3/movie/popular', BASE_URL);
  const data = await fetchFromMovieDB(url);
  return data.results;
}

export async function getDiscoverMovies(id?: string, keywords?: string) {
  const url = new URL('/3/discover/movie', BASE_URL);
  id && url.searchParams.append('with_genres', id);
  keywords && url.searchParams.append('with_keywords', keywords);

  const data = await fetchFromMovieDB(url);
  return data.results;
}

export async function getMovieByName(term: string) {
  const url = new URL('/3/search/movie', BASE_URL);
  url.searchParams.append('query', term);

  const data = await fetchFromMovieDB(url);
  return data.results;
}

export async function getMovieById(id: string) {
  const url = new URL(`/3/movie/${id}`, BASE_URL);
  const data = await fetchFromMovieDB<MovieDetails>(url);
  return data;
}
