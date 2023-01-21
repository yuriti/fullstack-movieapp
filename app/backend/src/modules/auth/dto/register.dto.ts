import { MaxLength, MinLength } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class RegisterDTO {
    @ApiProperty()
    @MinLength(3)
    @MaxLength(60)
    username: string;

    @ApiProperty()
    @MinLength(3)
    @MaxLength(120)
    password: string;
}
