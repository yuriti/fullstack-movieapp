import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { JWT, COOKIE_AUTH } from "./auth.enum";

import { AuthService } from "./auth.service";
import { RegisterDTO } from "./dto/register.dto";
import { LoginDTO } from "./dto/login.dto";

@Controller({
    version: "1",
    path: "api/auth",
})
@ApiTags("Auth")
export class AuthController {
    constructor(private readonly auth: AuthService) {}

    @Post()
    @ApiOperation({ summary: "Login" })
    async login(@Res() res: Response, @Body() data: LoginDTO) {
        const login = await this.auth.login(data);

        this.withAccessToken(res, login.accessToken);

        res.status(HttpStatus.OK).send();
    }

    @Post("signup")
    @ApiOperation({ summary: "Register" })
    async register(@Res() res: Response, @Body() data: RegisterDTO) {
        await this.auth.register(data);

        const login = await this.auth.login(data);

        this.withAccessToken(res, login.accessToken);

        res.send();
    }

    private withAccessToken(res: Response, accessToken: string) {
        const expires = new Date();
        expires.setDate(expires.getDate() + JWT.EXPIRES_DAYS);

        res.cookie(COOKIE_AUTH.ACCESS_TOKEN, accessToken, { expires });
    }
}
