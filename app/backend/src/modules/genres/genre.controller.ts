import { GenreDTO } from "./dto/genre.dto";
import { GenreService } from "~/modules/genres/genre.service";
import { ApiOperation, ApiTags, ApiCookieAuth, ApiOkResponse } from "@nestjs/swagger";
import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthUser } from "~/modules/auth/auth.decorator";
import { User } from "@prisma/client";
import { AuthGuard } from "~/modules/auth/auth.guard";

@Controller({
    version: "1",
    path: "api/genres",
})
@ApiTags("Genre")
export class GenreController {
    constructor(private readonly genre: GenreService) {}

    @Get()
    @ApiOperation({ summary: "Get all genres" })
    @ApiOkResponse({ type: GenreDTO, isArray: true })
    async fetchAll() {
        const { genres } = await this.genre.fetchAll();

        return genres.map((item) => new GenreDTO(item));
    }

    @Get("favorites")
    @ApiOperation({ summary: "Get the user favorite genres" })
    @ApiOkResponse({ type: GenreDTO, isArray: true })
    @ApiCookieAuth()
    @UseGuards(AuthGuard)
    async fetchFavorites(@AuthUser() user: User) {
        const items = await this.genre.fetchFavoritesForUser(user.id);

        return items.map((item) => new GenreDTO({ ...item.genre, score: item.score }));
    }
}
