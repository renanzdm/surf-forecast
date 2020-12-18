"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeUtil = void 0;
const moment_1 = __importDefault(require("moment"));
class TimeUtil {
    static getUnixTimeForAFutureDay(days) {
        return moment_1.default().add(days, 'days').unix();
    }
}
exports.TimeUtil = TimeUtil;
//# sourceMappingURL=time.js.map