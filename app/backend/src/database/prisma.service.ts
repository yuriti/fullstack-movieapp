import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService
    extends PrismaClient<Prisma.PrismaClientOptions, "query">
    implements OnModuleInit, OnModuleDestroy
{
    constructor() {
        super({
            log: [
                {
                    emit: "event",
                    level: "query",
                },
                {
                    emit: "event",
                    level: "error",
                },
                {
                    emit: "event",
                    level: "info",
                },
                {
                    emit: "event",
                    level: "warn",
                },
            ],
        });
    }

    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}
