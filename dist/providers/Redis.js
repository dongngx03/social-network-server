"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const Locals_1 = __importDefault(require("./Locals"));
class RedisDB {
    constructor() {
        this.redis = new ioredis_1.default(Locals_1.default.config().redis_url);
        this.redis.on('connect', function () {
            console.log('Connected to Redis');
        });
        this.redis.on('error', function (err) {
            console.error('Redis error:', err);
        });
    }
}
exports.default = new RedisDB;
