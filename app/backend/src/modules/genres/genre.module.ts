import { GenreController } from "./genre.controller";
import { Module } from "@nestjs/common";

@Module({
    controllers: [GenreController],
})
export class GenreModule {}
