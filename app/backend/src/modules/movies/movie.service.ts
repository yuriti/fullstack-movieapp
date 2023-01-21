import { Get, Injectable, NotFoundException } from "@nestjs/common";

import { MOVIE_RATE } from "./movie.enum";
import { PrismaService } from "~/database/prisma.service";
import { TmdbService } from "~/modules/tmdb/tmdb.service";
import { head } from "lodash";
import { randomInt } from "crypto";

// https://developers.themoviedb.org/3/getting-started/images

@Injectable()
export class MovieService {
    constructor(protected readonly prisma: PrismaService, protected readonly tmdb: TmdbService) {}

    // We get any movie without a specific sample
    async fetchOneRandom() {
        const { results } = await this.tmdb.api.moviePopular({ page: randomInt(1, 100) });

        return results[randomInt(0, results.length - 1)];
    }

    // Get a movie trailer
    async fetchTrailer(movieId: number) {
        const { results } = await this.tmdb.api.movieVideos(movieId);

        return head(results.filter((item) => item.type === "Trailer" && item.site === "YouTube"));
    }

    // We get one preferred movie for the user relative to his selected genres
    fetchOnePreferredForUser(ctx: { userId: number }) {}

    // Rate the movie
    async rate(ctx: { userId: number; movieId: number; value: MOVIE_RATE }) {
        const item = await this.tmdb.api.movieInfo(ctx.movieId);

        await Promise.all(
            item.genres.map((genre) =>
                this.prisma.userFavoriteGenres.upsert({
                    where: { userId_genreId: { userId: ctx.userId, genreId: genre.id } },
                    create: { userId: ctx.userId, genreId: genre.id, score: ctx.value },
                    update: { score: { increment: ctx.value } },
                })
            )
        );
    }
}
