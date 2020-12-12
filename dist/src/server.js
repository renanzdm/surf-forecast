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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetupServer = void 0;
require("./utils/module_alias");
const core_1 = require("@overnightjs/core");
const body_parser_1 = __importDefault(require("body-parser"));
const forecast_1 = require("./controller/forecast");
const database = __importStar(require("@src/database"));
const beaches_1 = require("./controller/beaches");
const users_1 = require("./controller/users");
class SetupServer extends core_1.Server {
    constructor(port = 3000) {
        super();
        this.port = port;
    }
    async init() {
        this.setupExpress();
        this.setupControllers();
        await this.databaseSetup();
    }
    setupExpress() {
        this.app.use(body_parser_1.default.json());
    }
    setupControllers() {
        const forecastController = new forecast_1.ForecastController();
        const beachesController = new beaches_1.BeachesController();
        const usersController = new users_1.UsersController();
        this.addControllers([forecastController, beachesController, usersController]);
    }
    async databaseSetup() {
        await database.connect();
    }
    async close() {
        await database.close();
    }
    getApp() {
        return this.app;
    }
    start() {
        this.app.listen(this.port, () => {
            console.info('Server listening of port', this.port);
        });
    }
}
exports.SetupServer = SetupServer;
//# sourceMappingURL=server.js.map