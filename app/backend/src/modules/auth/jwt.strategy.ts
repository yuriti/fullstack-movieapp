import { AuthService } from "./auth.service";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Payload } from "./interfaces/payload.interface";
import { Request } from "express";
import { Strategy } from "passport-jwt";
import { UserService } from "~/modules/users/user.service";

const cookieExtractor = (req: Request) => req.cookies?.access_token || null;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly auth: AuthService, private readonly user: UserService) {
        super({
            jwtFromRequest: cookieExtractor,
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: Payload) {
        return this.user.findOne(payload.userId);
    }
}
