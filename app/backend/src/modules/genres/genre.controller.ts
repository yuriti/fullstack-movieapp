import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Controller, Get } from "@nestjs/common";

@Controller({
    version: "1",
    path: "api/genres",
})
@ApiTags("Genre")
export class GenreController {
    @Get()
    @ApiOperation({ summary: "Get all genres" })
    fetchAll() {}

    @Get("favorites")
    @ApiOperation({ summary: "Get the user favorite genres" })
    fetchFavorites() {}
}
