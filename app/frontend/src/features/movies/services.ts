import { Movie, Video } from "./models";
import { fetchApi, mutationApi, queryApi } from "app/api";

import { MOVIE_RATE } from "./enums";

const BASE_URL = `http://localhost/api/movies`;

type MovieTrailerContext = { movieId: number };
type RateContext = { movieId: number; value: MOVIE_RATE };

const fetchMovieRandom = () => fetchApi<Movie>(`${BASE_URL}/random`, {});
const fetchMoviePreferred = () => fetchApi<Movie>(`${BASE_URL}/preferred`, {});
const fetchMovieTrailer = (ctx: MovieTrailerContext) => fetchApi<Video>(`${BASE_URL}/${ctx.movieId}/trailer`, {});

const rate = ({ movieId, ...data }: RateContext) =>
    fetchApi(`${BASE_URL}/${movieId}/rate`, { method: "POST", body: JSON.stringify(data) });

export const queryMovieRandom = () => queryApi({ queryKey: ["movie", "random"], queryFn: fetchMovieRandom });
export const queryMoviePreferred = () => queryApi({ queryKey: ["movie", "preferred"], queryFn: fetchMoviePreferred });
export const queryMovieTrailer = (ctx: MovieTrailerContext) =>
    queryApi({ queryKey: ["movie", "tailer", ctx], queryFn: () => fetchMovieTrailer(ctx) });

export const mutationMovieRate = () => mutationApi({ mutationFn: rate });
