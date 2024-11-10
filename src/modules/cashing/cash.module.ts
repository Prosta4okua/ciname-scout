import { Global, Module } from "@nestjs/common";
import { CacheService } from "./services/cash.service";

@Global()
@Module({
	providers: [CacheService],
	exports: [CacheService],
})
export class CashingModule {}
