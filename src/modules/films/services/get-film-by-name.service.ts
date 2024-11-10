import { Injectable } from "@nestjs/common";
import { CacheService } from "../../cashing/services/cash.service";
import { FilmNotFoundException } from "../exceptions/film-not-found.exception";
import { RawFilmToFilmMapper } from "../mappers/film-entity-to-film-dto.mapper";
import { FilmWithDetailsType } from "../types/film-with-details.type";
import { GetFilmByNameFromCacheService } from "./get-film-by-name-from-cache.service";
import { GetFilmByNameFromDbService } from "./get-film-by-name-from-db.service";

@Injectable()
export class GetFilmByNameService {
	private pendingRequests: Map<string, Promise<FilmWithDetailsType>> =
		new Map();

	constructor(
		private readonly getFilmByNameFromCacheService: GetFilmByNameFromCacheService,
		private readonly getFilmByNameFromDbService: GetFilmByNameFromDbService,
		private readonly cacheService: CacheService,
		private readonly rawFilmToFilmMapper: RawFilmToFilmMapper,
	) {}

	async handle(filmName: string): Promise<FilmWithDetailsType> {
		const delay = (ms: number) =>
			new Promise((resolve) => setTimeout(resolve, ms));

		const cachedFilm =
			await this.getFilmByNameFromCacheService.handle(filmName);

		if (cachedFilm) {
			return cachedFilm;
		}

		if (this.pendingRequests.has(filmName)) {
			return await this.pendingRequests.get(filmName); 
		}

		const fetchPromise = this.getFilmByNameFromDbService
			.handle(filmName)
			.then(async (rawResult) => {
				if (!rawResult) {
					throw new FilmNotFoundException();
				}
				const result = this.rawFilmToFilmMapper.map(rawResult);

				this.cacheService.set(filmName, result);

				await delay(5000);

				return result;
			})
			.finally(() => {
				this.pendingRequests.delete(filmName);
			});

		this.pendingRequests.set(filmName, fetchPromise);

		return await fetchPromise;
	}
}
