"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetupServer = void 0;
require("./util/module-alias");
const core_1 = require("@overnightjs/core");
const body_parser_1 = __importDefault(require("body-parser"));
const express_pino_logger_1 = __importDefault(require("express-pino-logger"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const express_openapi_validator_1 = require("express-openapi-validator");
const forecast_1 = require("./controllers/forecast");
const database = __importStar(require("@src/database"));
const beaches_1 = require("./controllers/beaches");
const users_1 = require("./controllers/users");
const logger_1 = __importDefault(require("./logger"));
const api_schema_json_1 = __importDefault(require("./api-schema.json"));
const api_error_validator_1 = require("./middlewares/api-error-validator");
class SetupServer extends core_1.Server {
    constructor(port = 3000) {
        super();
        this.port = port;
    }
    async init() {
        this.setupExpress();
        await this.docsSetup();
        this.setupControllers();
        await this.databaseSetup();
        this.setupErrorHanlders();
    }
    setupExpress() {
        this.app.use(body_parser_1.default.json());
        this.app.use(express_pino_logger_1.default({
            logger: logger_1.default,
        }));
        this.app.use(cors_1.default({
            origin: '*',
        }));
    }
    setupErrorHanlders() {
        this.app.use(api_error_validator_1.apiErrorValidator);
    }
    async docsSetup() {
        this.app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(api_schema_json_1.default));
        await new express_openapi_validator_1.OpenApiValidator({
            apiSpec: api_schema_json_1.default,
            validateRequests: true,
            validateResponses: true,
        }).install(this.app);
    }
    setupControllers() {
        const forecastController = new forecast_1.ForecastController();
        const beachesController = new beaches_1.BeachesController();
        const usersController = new users_1.UsersController();
        this.addControllers([
            forecastController,
            beachesController,
            usersController,
        ]);
    }
    getApp() {
        return this.app;
    }
    async databaseSetup() {
        await database.connect();
    }
    async close() {
        await database.close();
        if (this.server) {
            await new Promise((resolve, reject) => {
                var _a;
                (_a = this.server) === null || _a === void 0 ? void 0 : _a.close((err) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve();
                });
            });
        }
    }
    start() {
        this.server = this.app.listen(this.port, () => {
            logger_1.default.info('Server listening on port: ' + this.port);
        });
    }
}
exports.SetupServer = SetupServer;
//# sourceMappingURL=server.js.map