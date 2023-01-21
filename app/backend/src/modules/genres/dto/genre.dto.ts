import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

import { DTO } from "~/app/dto";
import type { Genre } from "moviedb-promise";

@Exclude()
export class GenreDTO extends DTO<GenreDTO> implements Partial<Genre> {
    @Expose()
    @ApiProperty()
    id?: number;

    @Expose()
    @ApiProperty()
    name?: string;

    @Expose()
    @ApiPropertyOptional()
    score?: number;
}
