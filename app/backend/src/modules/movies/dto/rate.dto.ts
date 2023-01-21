import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { MOVIE_RATE } from "~/modules/movies/movie.enum";

export class RateDTO {
    @ApiProperty()
    @IsEnum(MOVIE_RATE)
    value: MOVIE_RATE;
}
