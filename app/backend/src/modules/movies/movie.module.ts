import { DatabaseModule } from "~/database/database.module";
import { Module } from "@nestjs/common";
import { MovieController } from "./movie.controller";
import { MovieService } from "./movie.service";
import { TmdbModule } from "~/modules/tmdb/tmdb.module";

@Module({
    imports: [DatabaseModule, TmdbModule],
    controllers: [MovieController],
    providers: [MovieService],
    exports: [MovieService],
})
export class MovieModule {}
