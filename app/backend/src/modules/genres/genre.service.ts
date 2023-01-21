import { Injectable } from "@nestjs/common";
import { PrismaService } from "~/database/prisma.service";
import { TmdbService } from "~/modules/tmdb/tmdb.service";
import { keyBy } from "lodash";

@Injectable()
export class GenreService {
    constructor(private readonly tmdb: TmdbService, private readonly prisma: PrismaService) {}

    fetchAll() {
        return this.tmdb.api.genreMovieList();
    }

    async fetchFavoritesForUser(userId: number) {
        const [genres, items] = await Promise.all([
            this.tmdb.api.genreMovieList().then((items) => keyBy(items.genres, "id")),
            this.prisma.userFavoriteGenres.findMany({ where: { userId } }),
        ]);

        return items.map((item) => ({ ...item, genre: genres[item.genreId] }));
    }
}
