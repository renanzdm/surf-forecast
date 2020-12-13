"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForecastController = void 0;
const core_1 = require("@overnightjs/core");
const beach_1 = require("@src/models/beach");
const forecast_1 = require("@src/services/forecast");
const auth_1 = require("@src/middlewares/auth");
const _1 = require(".");
const logger_1 = __importDefault(require("@src/logger"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const api_error_1 = __importDefault(require("@src/util/errors/api-error"));
const forecast = new forecast_1.Forecast();
const rateLimiter = express_rate_limit_1.default({
    windowMs: 1 * 60 * 1000,
    max: 10,
    keyGenerator(req) {
        return req.ip;
    },
    handler(_, res) {
        res.status(429).send(api_error_1.default.format({
            code: 429,
            message: "Too many requests to the '/forecast endpoint'",
        }));
    },
});
let ForecastController = class ForecastController extends _1.BaseController {
    async getForecastForgeLoggedUser(req, res) {
        var _a;
        try {
            const { orderBy, orderField, } = req.query;
            const beaches = await beach_1.Beach.find({ userId: (_a = req.decoded) === null || _a === void 0 ? void 0 : _a.id });
            const forecastData = await forecast.processForecastForBeaches(beaches, orderBy, orderField);
            res.status(200).send(forecastData);
        }
        catch (error) {
            logger_1.default.error(error);
            this.sendErrorResponse(res, {
                code: 500,
                message: 'Something went wrong',
            });
        }
    }
};
__decorate([
    core_1.Get(''),
    core_1.Middleware(rateLimiter),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ForecastController.prototype, "getForecastForgeLoggedUser", null);
ForecastController = __decorate([
    core_1.Controller('forecast'),
    core_1.ClassMiddleware(auth_1.authMiddleware)
], ForecastController);
exports.ForecastController = ForecastController;
//# sourceMappingURL=forecast.js.map