import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";
import { FilmNotFoundException } from "../exceptions/film-not-found.exception";

@Catch(FilmNotFoundException)
export class FilmNotFoundExceptionFilter implements ExceptionFilter {
	catch(exception: FilmNotFoundException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const status = exception.getStatus();

		response.status(status).json({
			statusCode: status,
			message: exception.getResponse(),
		});
	}
}
