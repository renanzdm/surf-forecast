"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const logger_1 = __importDefault(require("@src/logger"));
const user_1 = require("@src/models/user");
const mongoose_1 = __importDefault(require("mongoose"));
class BaseController {
    sendCreatedUpdateErrorResponse(res, error) {
        if (error instanceof mongoose_1.default.Error.ValidationError) {
            const handleError = this.handleClientErrors(error);
            res.status(handleError.code).send({ code: handleError.code, error: handleError.error });
        }
        else {
            logger_1.default.error(error);
            res.status(500).send({ code: 500, error: 'Something went wrong' });
        }
    }
    handleClientErrors(error) {
        const duplicatedKindErrors = Object.values(error.errors).filter((err) => err.kind === user_1.CustomValidate.DUPICATED);
        if (duplicatedKindErrors.length) {
            return ({ code: 409, error: error.message });
        }
        else {
            return ({ code: 422, error: error.message });
        }
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=index.js.map