import { Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class GetFilmDto {
	@IsString()
	@IsNotEmpty()
	@Transform(({ value }: { value: string }) =>
		value.replaceAll("-", " ").toLowerCase(),
	)
	name: string;
}
