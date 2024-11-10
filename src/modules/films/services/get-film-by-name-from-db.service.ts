import { Inject, Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { DRIZZLE } from "../../database/drizzle.module";
import { film, lower } from "../../database/schema";
import { DrizzleDb } from "../../database/types/drizzle-db.type";
import { RawFilmWithDetailsType } from "../types/raw-film-with-details.type";

@Injectable()
export class GetFilmByNameFromDbService {
	constructor(@Inject(DRIZZLE) private readonly db: DrizzleDb) {}

	async handle(filmName: string): Promise<RawFilmWithDetailsType> {
		const rawResult = await this.db.query.film.findMany({
			where: eq(lower(film.title), filmName),
			with: {
				language: {
					columns: {
						name: true,
					},
				},
				filmCategories: {
					columns: {
						filmId: false,
						categoryId: false,
						lastUpdate: false,
					},
					with: {
						category: {
							columns: {
								categoryId: false,
								lastUpdate: false,
							},
						},
					},
				},
				filmActors: {
					columns: {
						actorId: false,
						filmId: false,
						lastUpdate: false,
					},
					with: {
						actor: {
							columns: {
								actorId: false,
								lastUpdate: false,
							},
						},
					},
				},
			},
		});

		return rawResult[0];
	}
}
