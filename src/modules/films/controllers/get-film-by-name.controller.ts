import { Controller, Get, Param } from "@nestjs/common";
import { GetFilmDto } from "../dto/get-film.dto";
import { GetFilmByNameService } from "../services/get-film-by-name.service";
import { FilmWithDetailsType } from "../types/film-with-details.type";

@Controller("/films")
export class GetFilmByNameController {
	constructor(private readonly getFilmByNameService: GetFilmByNameService) {}

	@Get("/:name")
	async handle(@Param() getFilmDto: GetFilmDto): Promise<FilmWithDetailsType> {
		const { name } = getFilmDto;

		return this.getFilmByNameService.handle(name);
	}
}
