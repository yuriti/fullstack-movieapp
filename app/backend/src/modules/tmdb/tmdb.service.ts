import { Injectable } from "@nestjs/common";
import { MovieDb } from "moviedb-promise";
import { head } from "lodash";

@Injectable()
export class TmdbService {
    private readonly _api: MovieDb;

    constructor() {
        this._api = new MovieDb(process.env.TMDB_API_KEY);
    }

    get api() {
        return this._api;
    }
}
