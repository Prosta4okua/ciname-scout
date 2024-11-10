import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Cacheable, CacheableMemory, Keyv } from "cacheable";
import { RedisService } from "../../redis/services/redis.service";

@Injectable()
export class CacheService {
	private cache: Cacheable;
	private redisCashTtl: number;

	constructor(
		private readonly configService: ConfigService,
		private readonly redisService: RedisService,
	) {
		this.initializeCache();
	}

	private async initializeCache() {
		const appCashTtl = this.configService.get<number>("APP_CACHE_TTL");
		this.redisCashTtl = this.configService.get<number>("REDIS_CACHE_TTL");

		console.log(`Nodejs cache ttl: ${appCashTtl}`);

		const primaryCache = new Keyv({
			store: new CacheableMemory({ ttl: appCashTtl, checkInterval: 1 }),
		});

		this.cache = new Cacheable({
			primary: primaryCache,
			stats: true,
		});
	}

	async get<FilmWithDetailsType>(key: string): Promise<FilmWithDetailsType> {
		console.log("Getting cache for key: ", key);
		const primaryCache = await this.cache.get(key);

		// console.log("Primary cache: ", primaryCache);

		if (!primaryCache) {
			const rawSecondaryCache = await this.redisService.get(key);
			const secondaryCache = JSON.parse(rawSecondaryCache);

			// console.log("Secondary cache: ", secondaryCache);

			return secondaryCache;
		}

		return primaryCache as FilmWithDetailsType;
	}

	async set<FilmWithDetailsType>(
		key: string,
		value: FilmWithDetailsType,
	): Promise<void> {
		await this.cache.set(key, value);

		const jsonValue = JSON.stringify(value);

		await this.redisService.insert(key, jsonValue, this.redisCashTtl);
	}

	async printStats(): Promise<void> {
		console.log("Printing cache stats");

		const { hits: hitsPrimary, misses: missesPrimary } = this.cache.stats;

		const primaryStatsString = `Stats for layer 1 cache (CacheableMemory):\nHits: ${hitsPrimary}, Misses: ${missesPrimary}`;

		console.log(primaryStatsString);

		this.redisService.printStats();

		console.log("-------------------------");
	}
}
