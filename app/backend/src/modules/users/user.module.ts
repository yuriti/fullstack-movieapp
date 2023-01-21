import { DatabaseModule } from "~/database/database.module";
import { Module } from "@nestjs/common";
import { UserService } from "./user.service";

@Module({
    imports: [DatabaseModule],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
