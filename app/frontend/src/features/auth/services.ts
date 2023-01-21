import { fetchApi, mutationApi } from "app/api";

const BASE_URL = `http://localhost/api/auth`;

type LoginContext = { username: string; password: string };
type RegisterContext = { username: string; password: string };

const login = (ctx: LoginContext) => fetchApi(BASE_URL, { method: "POST", body: JSON.stringify(ctx) });
const register = (ctx: RegisterContext) =>
    fetchApi(`${BASE_URL}/signup`, { method: "POST", body: JSON.stringify(ctx) });
const logout = () => fetchApi(`${BASE_URL}/logout`, { method: "POST" });

export const mutationLogin = () => mutationApi({ mutationFn: login });
export const mutationRegister = () => mutationApi({ mutationFn: register });
export const mutationLogout = () => mutationApi({ mutationFn: logout });
