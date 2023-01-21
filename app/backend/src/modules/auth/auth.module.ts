import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JWT } from "./auth.enum";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "~/modules/users/user.module";

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: JWT.EXPIRES_DAYS + "d" },
        }),
    ],
    controllers: [AuthController],
    providers: [JwtStrategy, AuthService],
    exports: [AuthService],
})
export class AuthModule {}
