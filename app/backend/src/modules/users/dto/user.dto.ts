import { Exclude, Expose } from "class-transformer";

import { ApiProperty } from "@nestjs/swagger";
import { DTO } from "~/app/dto";
import { User } from "@prisma/client";

@Exclude()
export class UserDTO extends DTO<UserDTO> implements Partial<User> {
    @Expose()
    @ApiProperty()
    id: number;

    @Expose()
    @ApiProperty()
    username: string;
}
