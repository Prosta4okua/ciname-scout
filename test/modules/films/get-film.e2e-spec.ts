import { Mock, beforeEach, describe, expect, it, vi } from "vitest";
import { CacheService } from "../../../src/modules/cashing/services/cash.service";
import { GetFilmByNameController } from "../../../src/modules/films/controllers/get-film-by-name.controller";
import { RawFilmToFilmMapper } from "../../../src/modules/films/mappers/film-entity-to-film-dto.mapper";
import { GetFilmByNameFromCacheService } from "../../../src/modules/films/services/get-film-by-name-from-cache.service";
import { GetFilmByNameFromDbService } from "../../../src/modules/films/services/get-film-by-name-from-db.service";
import { GetFilmByNameService } from "../../../src/modules/films/services/get-film-by-name.service";
import { FilmWithDetailsType } from "../../../src/modules/films/types/film-with-details.type";
import { RawFilmWithDetailsType } from "../../../src/modules/films/types/raw-film-with-details.type";

describe("GetFilmByNameController - E2E Test", () => {
	let controller: GetFilmByNameController;
	let getFilmByNameService: GetFilmByNameService;
	let getFilmByNameFromCacheService: GetFilmByNameFromCacheService;
	let getFilmByNameFromDbService: GetFilmByNameFromDbService;
	let cacheService: CacheService;

	const rawFilmToFilmMapper = new RawFilmToFilmMapper();

	const mockFilmName = "Inception";
	const mockRawFilmDetails: RawFilmWithDetailsType = {
		filmId: 1,
		title: "Inception",
		description: "A mind-bending thriller",
		releaseYear: 2010,
		languageId: 1,
		rentalDuration: 7,
		rentalRate: "2.99",
		length: 148,
		replacementCost: "19.99",
		rating: "PG-13",
		specialFeatures: ["Deleted Scenes", "Behind the Scenes"],
		lastUpdate: new Date().toDateString(),
		language: {
			name: "English",
		},
		fulltext: null,
		filmCategories: [
			{
				category: {
					name: "Sci-Fi",
				},
			},
			{
				category: {
					name: "Action",
				},
			},
		],
		filmActors: [
			{
				actor: {
					firstName: "Leonardo",
					lastName: "DiCaprio",
				},
			},
			{
				actor: {
					firstName: "Joseph",
					lastName: "Gordon-Levitt",
				},
			},
		],
	};
	const mockFilmDetails: FilmWithDetailsType = {
		filmId: 1,
		title: "Inception",
		description: "A mind-bending thriller",
		releaseYear: 2010,
		rentalDuration: 7,
		rentalRate: "2.99",
		length: 148,
		replacementCost: "19.99",
		rating: "PG-13",
		specialFeatures: ["Deleted Scenes", "Behind the Scenes"],
		lastUpdate: new Date().toDateString(),
		language: "English",
		fulltext: null,
		categories: ["Sci-Fi", "Action"],
		actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt"],
	};

	beforeEach(() => {
		cacheService = {
			get: vi.fn().mockResolvedValue(null),
			set: vi.fn(),
			printStats: vi.fn(),
		} as unknown as CacheService;

		getFilmByNameFromCacheService = new GetFilmByNameFromCacheService(
			cacheService,
		);

		getFilmByNameFromDbService = {
			handle: vi.fn(),
		} as unknown as GetFilmByNameFromDbService;

		getFilmByNameService = new GetFilmByNameService(
			getFilmByNameFromCacheService,
			getFilmByNameFromDbService,
			cacheService,
			rawFilmToFilmMapper,
		);

		controller = new GetFilmByNameController(getFilmByNameService);
	});

	it("should return cached film if available", async () => {
		(cacheService.get as Mock).mockResolvedValue(mockFilmDetails);

		const result = await controller.handle({ name: mockFilmName });

		expect(result).toEqual(mockFilmDetails);
		expect(cacheService.get).toHaveBeenCalledWith(mockFilmName);
	});

	it(
		"should fetch film from DB if not cached",
		async () => {
			(cacheService.get as Mock).mockResolvedValue(null); // No cached film

			(getFilmByNameFromDbService.handle as Mock).mockResolvedValue(
				mockRawFilmDetails,
			);

			const result = await controller.handle({ name: mockFilmName });

			expect(result).toEqual(mockFilmDetails);
			expect(getFilmByNameFromDbService.handle).toHaveBeenCalledWith(
				mockFilmName,
			);
			expect(cacheService.set).toHaveBeenCalledWith(
				mockFilmName,
				mockFilmDetails,
			);
		},
		15 * 1000,
	);

	it("should return error if film is not found in DB or cache", async () => {
		(cacheService.get as Mock).mockResolvedValue(null); // No cached film
		(getFilmByNameFromDbService.handle as Mock).mockResolvedValue(null); // DB also returns nothing

		try {
			await controller.handle({ name: mockFilmName });
		} catch (error) {
			expect(error).toBeDefined();
			expect(error.message).toBe("Film not found");
		}
	});

	it(
		"should handle concurrent requests correctly",
		async () => {
			(cacheService.get as Mock).mockResolvedValue(null); // No cached film

			(getFilmByNameFromDbService.handle as Mock).mockResolvedValue(
				mockRawFilmDetails,
			);

			const firstRequest = controller.handle({ name: mockFilmName });
			const secondRequest = controller.handle({ name: mockFilmName });

			const firstResult = await firstRequest;
			const secondResult = await secondRequest;

			expect(firstResult).toEqual(mockFilmDetails);
			expect(secondResult).toEqual(mockFilmDetails);
			expect(getFilmByNameFromDbService.handle).toHaveBeenCalledTimes(1);
			expect(cacheService.set).toHaveBeenCalledWith(
				mockFilmName,
				mockFilmDetails,
			);
			expect(cacheService.get).toHaveBeenCalledWith(mockFilmName);
		},
		15 * 1000,
	);
});
