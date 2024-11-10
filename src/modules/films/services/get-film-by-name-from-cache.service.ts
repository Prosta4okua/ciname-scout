import { Injectable } from "@nestjs/common";
import { CacheService } from "../../cashing/services/cash.service";
import { FilmWithDetailsType } from "../types/film-with-details.type";

@Injectable()
export class GetFilmByNameFromCacheService {
	constructor(private readonly cacheService: CacheService) {}
	async handle(filmName: string): Promise<FilmWithDetailsType | null> {
		const cachedFilm = (await this.cacheService.get(
			filmName,
		)) as FilmWithDetailsType;
		if (cachedFilm && Object.keys(cachedFilm).length !== 0) {
			return cachedFilm;
		}

		return null;
	}
}
