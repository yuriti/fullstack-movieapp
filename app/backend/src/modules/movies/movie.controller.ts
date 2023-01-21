import { MovieDTO } from "./dto/movie.dto";
import { ApiBearerAuth, ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Get, NotFoundException, Param, Post, UseGuards } from "@nestjs/common";

import { MovieService } from "./movie.service";
import { throwIf } from "~/app/helpers/throw";
import { VideoDTO } from "./dto/video.dto";
import { RateDTO } from "./dto/rate.dto";
import { AuthGuard } from "~/modules/auth/auth.guard";
import { AuthUser } from "~/modules/auth/auth.decorator";
import { User } from "@prisma/client";

@Controller({
    version: "1",
    path: "api/movies",
})
@ApiTags("Movie")
export class MovieController {
    constructor(protected readonly movie: MovieService) {}

    @Get("random")
    @ApiOperation({ summary: "We get any movie without a specific sample" })
    @ApiOkResponse({ type: MovieDTO })
    async fetchRandom() {
        const item = await this.movie.fetchOneRandom();

        throwIf(!item, new NotFoundException());

        return new MovieDTO(item);
    }

    @Get("preferred")
    @ApiOperation({ summary: "We get one preferred movie for the user relative to his selected genres" })
    @ApiOkResponse({ type: MovieDTO })
    @ApiCookieAuth()
    @UseGuards(AuthGuard)
    async fetchPreferred(@AuthUser() user: User) {
        const item = await this.movie.fetchOnePreferredForUser(user.id);

        throwIf(!item, new NotFoundException());

        return new MovieDTO(item);
    }

    @Get(":movieId/trailer")
    @ApiOperation({ summary: "Get a movie trailer" })
    @ApiOkResponse({ type: VideoDTO })
    async fetchTrailer(@Param("movieId") movieId: number) {
        const item = await this.movie.fetchTrailer(movieId);

        throwIf(!item, new NotFoundException());

        return new VideoDTO(item);
    }

    @Post(":movieId/rate")
    @ApiOperation({ summary: "Rate the movie" })
    @ApiCookieAuth()
    @UseGuards(AuthGuard)
    async rate(@AuthUser() user: User, @Param("movieId") movieId: number, @Body() data: RateDTO) {
        await this.movie.rate({ userId: user.id, movieId, value: data.value });
    }
}
