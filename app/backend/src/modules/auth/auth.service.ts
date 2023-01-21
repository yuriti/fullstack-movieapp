import * as bcrypt from "bcrypt";

import { BadRequestException, Injectable } from "@nestjs/common";

import { JwtService } from "@nestjs/jwt";
import { Payload } from "./interfaces/payload.interface";
import { UserService } from "~/modules/users/user.service";
import { throwIf } from "~/app/helpers/throw";

@Injectable()
export class AuthService {
    constructor(private readonly jwt: JwtService, private readonly user: UserService) {}

    async login(ctx: { username: string; password: string }) {
        const user = await this.user.findOneByUsername(ctx.username);

        throwIf(!this.passwordCompare({ password: ctx.password, hash: user.password }), new BadRequestException());

        return { user, accessToken: await this.jwt.signAsync({ userId: user.id } as Payload) };
    }

    async register(ctx: { username: string; password: string }) {
        return this.user.create({ ...ctx, password: await this.passwordHash(ctx.password) });
    }

    passwordCompare(ctx: { password: string; hash: string }) {
        return bcrypt.compare(ctx.password, ctx.hash);
    }

    passwordHash(password: string) {
        return bcrypt.hash(password, 10);
    }
}
