import { Inject, Injectable } from "@nestjs/common";
import { Redis } from "ioredis";
import { IORedisKey } from "../constants/redis.constants";

@Injectable()
export class RedisService {
	private hits = 0;
	private misses = 0;

	constructor(
		@Inject(IORedisKey)
		private readonly redisClient: Redis,
	) {}

	async getKeys(pattern?: string): Promise<string[]> {
		return await this.redisClient.keys(pattern);
	}

	async insert(key: string, value: string | number, ttl: number): Promise<void> {
		await this.redisClient.set(key, value, 'EX', ttl);
	}

	async get(key: string): Promise<string> {
		const result = this.redisClient.get(key);

		if (result) {
			this.hits++;
		} else {
			this.misses++;
		}

		return result;
	}

	async delete(key: string): Promise<void> {
		await this.redisClient.del(key);
	}

	async validate(key: string, value: string): Promise<boolean> {
		const storedValue = await this.redisClient.get(key);

		return storedValue === value;
	}

	printStats(): void {
		console.log(
			`Stats for layer 2 cache (Redis):\nHits: ${this.hits}, Misses: ${this.misses}`,
		);
	}
}
