import Redis from "ioredis"
import Locals from "./Locals"

class RedisDB {
    public redis: any

    constructor() {
        this.redis = new Redis(Locals.config().redis_url)

        this.redis.on('connect', function () {
            console.log('Connected to Redis');
        });

        this.redis.on('error', function (err: any) {
            console.error('Redis error:', err);
        });
    }
}

export default new RedisDB