import { Matches, MaxLength, MinLength } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class LoginDTO {
    @ApiProperty()
    @MinLength(3)
    @MaxLength(60)
    @Matches(/^[a-zA-Z\-]+$/)
    username: string;

    @ApiProperty()
    @MinLength(3)
    @MaxLength(120)
    password: string;
}
