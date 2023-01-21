import { Exclude, Expose } from "class-transformer";

import { ApiProperty } from "@nestjs/swagger";
import { DTO } from "~/app/dto";
import type { Video } from "moviedb-promise";

@Exclude()
export class VideoDTO extends DTO<VideoDTO> implements Partial<Video> {
    @Expose()
    @ApiProperty()
    key?: string;
}
