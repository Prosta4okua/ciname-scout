import { Module } from "@nestjs/common";
import { RawFilmToFilmMapper } from "./mappers/film-entity-to-film-dto.mapper";
import { GetFilmByNameFromCacheService } from "./services/get-film-by-name-from-cache.service";
import { GetFilmByNameFromDbService } from "./services/get-film-by-name-from-db.service";
import { GetFilmByNameService } from "./services/get-film-by-name.service";
import { GetFilmByNameController } from "./controllers/get-film-by-name.controller";

@Module({
	imports: [],
	providers: [
		GetFilmByNameService,
		RawFilmToFilmMapper,
		GetFilmByNameFromDbService,
		GetFilmByNameFromCacheService,
	],
	exports: [],
	controllers: [GetFilmByNameController],
})
export class FilmModule {}
