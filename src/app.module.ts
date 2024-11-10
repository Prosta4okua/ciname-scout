import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CashingModule } from "./modules/cashing/cash.module";
import { DrizzleModule } from "./modules/database/drizzle.module";
import { FilmModule } from "./modules/films/film.module";
import { RedisModule } from "./modules/redis/redis.module";

@Module({
	imports: [
		FilmModule,
		RedisModule,
		DrizzleModule,
		ConfigModule.forRoot({
			envFilePath: ".env",
			isGlobal: true,
		}),
		CashingModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
