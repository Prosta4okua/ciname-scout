import {
	SelectFilmType,
	SelectLanguageType,
	SelectCategoryType,
	SelectActorType,
} from "../../database/schema";

export type RawFilmWithDetailsType = SelectFilmType & {
	language: Pick<SelectLanguageType, "name">;
	filmCategories: {
		category: Pick<SelectCategoryType, "name">;
	}[];
	filmActors: {
		actor: Pick<SelectActorType, "firstName" | "lastName">;
	}[];
};
