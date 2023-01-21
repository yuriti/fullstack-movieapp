import { DatabaseModule } from "~/database/database.module";
import { GenreController } from "./genre.controller";
import { GenreService } from "./genre.service";
import { Module } from "@nestjs/common";
import { TmdbModule } from "~/modules/tmdb/tmdb.module";

@Module({
    imports: [DatabaseModule, TmdbModule],
    controllers: [GenreController],
    providers: [GenreService],
    exports: [GenreService],
})
export class GenreModule {}
