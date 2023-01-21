import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";

import { AuthService } from "./auth.service";
import { PassportStrategy } from "@nestjs/passport";
import { Payload } from "./interfaces/payload.interface";
import { Request } from "express";
import { UserService } from "~/modules/users/user.service";
import { throwIf } from "~/app/helpers/throw";

const cookieExtractor = (req: Request) => req.cookies?.access_token || null;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly auth: AuthService, private readonly user: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor, ExtractJwt.fromAuthHeaderAsBearerToken()]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: Payload) {
        return this.user.findOne(payload.userId);
    }
}
