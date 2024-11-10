import { SelectFilmType } from "../../database/schema";

export type FilmWithDetailsType = Omit<SelectFilmType, "languageId"> & {
	language: string;
	categories: string[];
	actors: string[];
};
