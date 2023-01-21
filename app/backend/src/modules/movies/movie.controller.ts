import { MovieDTO } from "./dto/movie.dto";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Get, NotFoundException, Param, Post } from "@nestjs/common";

import { MovieService } from "./movie.service";
import { throwIf } from "~/app/helpers/throw";
import { VideoDTO } from "./dto/video.dto";
import { RateDTO } from "./dto/rate.dto";

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
    fetchPreferred() {}

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
    rate(@Param("movieId") movieId: number, @Body() data: RateDTO) {
        // this.movie.rate({userId: 1, movieId, value})
    }
}
