import { Exclude, Expose } from "class-transformer";

import { ApiProperty } from "@nestjs/swagger";
import { DTO } from "~/app/dto";
import type { MovieResult } from "moviedb-promise";

@Exclude()
export class MovieDTO extends DTO<MovieDTO> implements Partial<MovieResult> {
    @Expose()
    @ApiProperty()
    id?: number;

    @Expose()
    @ApiProperty()
    title?: string;

    @Expose()
    @ApiProperty({ type: String })
    backdropPath?() {
        return this.backdrop_path;
    }

    @Expose()
    @ApiProperty({ type: String })
    posterPath?() {
        return this.poster_path;
    }

    @Expose()
    @ApiProperty({ type: Number })
    score?() {
        return Math.round(this.vote_average ?? 0);
    }

    @Expose()
    @ApiProperty({ type: String })
    releaseAt?() {
        return this.release_date;
    }

    vote_average?: number;
    backdrop_path?: string;
    poster_path?: string;
    release_date?: string;
}
