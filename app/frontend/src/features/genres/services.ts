import { fetchApi, queryApi } from "app/api";

import { Genre } from "./models";

const BASE_URL = `http://localhost/api/genres`;

const fetchGenreFavorites = () => fetchApi<Genre[]>(`${BASE_URL}/favorites`, {});

export const queryGenreFavorites = () => queryApi({ queryKey: ["genres", "favorites"], queryFn: fetchGenreFavorites });
