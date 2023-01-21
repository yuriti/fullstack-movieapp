import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiTags, ApiCookieAuth, ApiOperation, ApiOkResponse } from "@nestjs/swagger";
import { AuthGuard } from "~/modules/auth/auth.guard";
import { AuthUser } from "~/modules/auth/auth.decorator";
import { User } from "@prisma/client";
import { UserDTO } from "./dto/user.dto";

@Controller({
    version: "1",
    path: "api/users",
})
@ApiTags("User")
export class UserController {
    @Get("profile")
    @ApiOperation({ summary: "Get the profile of the currently authorized user" })
    @ApiOkResponse({ type: UserDTO })
    @ApiCookieAuth()
    @UseGuards(AuthGuard)
    profile(@AuthUser() user: User) {
        return new UserDTO(user);
    }
}
