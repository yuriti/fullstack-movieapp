import { fetchApi, queryApi } from "app/api";

import { User } from "./models";

const BASE_URL = `http://localhost/api/users`;

const fetchProfile = () => fetchApi<User>(`${BASE_URL}/profile`, {});

export const queryProfile = () => queryApi({ queryKey: ["profile"], queryFn: fetchProfile });
