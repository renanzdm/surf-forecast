"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiErrorValidator = void 0;
const api_error_1 = __importDefault(require("@src/util/errors/api-error"));
function apiErrorValidator(error, _, res, __) {
    const errorCode = error.status || 500;
    res
        .status(errorCode)
        .json(api_error_1.default.format({ code: errorCode, message: error.message }));
}
exports.apiErrorValidator = apiErrorValidator;
//# sourceMappingURL=api-error-validator.js.map