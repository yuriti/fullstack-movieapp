import { Movie, Video } from "./models";
import { fetchApi, queryApi } from "app/api";

const BASE_URL = `http://localhost/api/movies`;

type MovieTrailerContext = { movieId: number };

const fetchMovieRandom = () => fetchApi<Movie>(`${BASE_URL}/random`, {});
const fetchMovieTrailer = (ctx: MovieTrailerContext) => fetchApi<Video>(`${BASE_URL}/${ctx.movieId}/trailer`, {});

export const queryMovieRandom = () => queryApi({ queryKey: ["movie", "random"], queryFn: fetchMovieRandom });
export const queryMovieTrailer = (ctx: MovieTrailerContext) =>
    queryApi({ queryKey: ["movie", "tailer", ctx], queryFn: () => fetchMovieTrailer(ctx) });
