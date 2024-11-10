import { HttpException, HttpStatus } from "@nestjs/common";

export class FilmNotFoundException extends HttpException {
	constructor() {
		super("Film not found", HttpStatus.BAD_REQUEST);
	}
}
