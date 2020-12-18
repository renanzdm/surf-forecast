"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_error_1 = __importDefault(require("../api-error"));
describe('ApiError', () => {
    it('should format error with mandatory fields', () => {
        const error = api_error_1.default.format({ code: 404, message: 'User not found!' });
        expect(error).toEqual({
            message: 'User not found!',
            error: 'Not Found',
            code: 404,
        });
    });
    it('should format error with mandatory fields and description', () => {
        const error = api_error_1.default.format({
            code: 404,
            message: 'User not found!',
            description: 'This error happens when there is no user created',
        });
        expect(error).toEqual({
            message: 'User not found!',
            error: 'Not Found',
            code: 404,
            description: 'This error happens when there is no user created',
        });
    });
    it('should format error with mandatory fields and description and documentation', () => {
        const error = api_error_1.default.format({
            code: 404,
            message: 'User not found!',
            description: 'This error happens when there is no user created',
            documentation: 'https://mydocs.com/error-404',
        });
        expect(error).toEqual({
            message: 'User not found!',
            error: 'Not Found',
            code: 404,
            description: 'This error happens when there is no user created',
            documentation: 'https://mydocs.com/error-404',
        });
    });
});
//# sourceMappingURL=api-error.test.js.map