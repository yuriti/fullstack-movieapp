import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { ClassSerializerInterceptor, Module } from "@nestjs/common";

import { AllExceptionsFilter } from "~/app/filters/all-exception.filter";
import { AuthModule } from "~/modules/auth/auth.module";
import { DatabaseModule } from "~/database/database.module";
import { GenreModule } from "~/modules/genres/genre.module";
import { MovieModule } from "~/modules/movies/movie.module";

@Module({
    imports: [DatabaseModule, AuthModule, MovieModule, GenreModule],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: ClassSerializerInterceptor,
        },
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter,
        },
    ],
})
export class AppModule {}
