import {} from "../../database/schema";
import { FilmWithDetailsType } from "../types/film-with-details.type";
import { RawFilmWithDetailsType } from "../types/raw-film-with-details.type";

export class RawFilmToFilmMapper {
	map(rawFilmWithDetails: RawFilmWithDetailsType): FilmWithDetailsType {
		const {
			filmId,
			title,
			description,
			releaseYear,
			rentalDuration,
			rentalRate,
			length,
			replacementCost,
			rating,
			specialFeatures,
			lastUpdate,
			fulltext,
			language: { name: languageName },
			filmCategories,
			filmActors,
		} = rawFilmWithDetails;

		return {
			filmId,
			title,
			description,
			releaseYear,
			rentalDuration,
			rentalRate,
			length,
			replacementCost,
			rating,
			specialFeatures,
			lastUpdate,
			language: languageName,
			fulltext,
			categories: filmCategories.map(({ category: { name } }) => name),
			actors: filmActors.map(
				({ actor: { firstName, lastName } }) => `${firstName} ${lastName}`,
			),
		};
	}
}
