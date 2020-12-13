"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cache_1 = __importDefault(require("node-cache"));
class CacheUtil {
    constructor(cacheService = new node_cache_1.default()) {
        this.cacheService = cacheService;
    }
    set(key, value, ttl = 3600) {
        return this.cacheService.set(key, value, ttl);
    }
    get(key) {
        return this.cacheService.get(key);
    }
    clearAllCache() {
        return this.cacheService.flushAll();
    }
}
exports.default = new CacheUtil();
//# sourceMappingURL=cache.js.map