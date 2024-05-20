"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Redis_1 = __importDefault(require("../providers/Redis"));
class RedisService {
    static setPromise(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return new Promise((isOkey, isError) => {
                    // set value 
                    Redis_1.default.redis.set(key, value, (err, rs) => {
                        return !err ? isOkey(rs) : isError(err);
                    });
                });
            }
            catch (error) {
            }
        });
    }
    static getPromise(key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return new Promise((isOkey, isError) => {
                    // get value 
                    Redis_1.default.redis.get(key, (err, rs) => {
                        return !err ? isOkey(rs) : isError(err);
                    });
                });
            }
            catch (error) {
            }
        });
    }
    static deletePromise(key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return new Promise((isOkey, isError) => {
                    // get value 
                    Redis_1.default.redis.del(key, (err, rs) => {
                        return !err ? isOkey(rs) : isError(err);
                    });
                });
            }
            catch (error) {
            }
        });
    }
}
exports.default = RedisService;
