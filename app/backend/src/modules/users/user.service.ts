import { Injectable } from "@nestjs/common";
import { PrismaService } from "~/database/prisma.service";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    findOne(id: number) {
        return this.prisma.user.findUniqueOrThrow({ where: { id } });
    }

    findOneByUsername(username: string) {
        return this.prisma.user.findUniqueOrThrow({ where: { username } });
    }

    create(ctx: { username: string; password: string }) {
        return this.prisma.user.create({
            data: { ...ctx },
        });
    }
}
