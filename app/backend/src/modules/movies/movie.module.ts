import { DatabaseModule } from "~/database/database.module";
import { GenreModule } from '~/modules/genres/genre.module';
import { Module } from "@nestjs/common";
import { MovieController } from "./movie.controller";
import { MovieService } from "./movie.service";
import { TmdbModule } from "~/modules/tmdb/tmdb.module";
import { UserModule } from '~/modules/users/user.module';

@Module({
    imports: [DatabaseModule, TmdbModule, UserModule, GenreModule],
    controllers: [MovieController],
    providers: [MovieService],
    exports: [MovieService],
})
export class MovieModule {}
