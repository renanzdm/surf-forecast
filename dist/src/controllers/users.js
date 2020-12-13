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
exports.UsersController = void 0;
const core_1 = require("@overnightjs/core");
const user_1 = require("@src/models/user");
const auth_1 = __importDefault(require("@src/services/auth"));
const index_1 = require("./index");
const auth_2 = require("@src/middlewares/auth");
let UsersController = class UsersController extends index_1.BaseController {
    async create(req, res) {
        try {
            const user = new user_1.User(req.body);
            const newUser = await user.save();
            res.status(201).send(newUser);
        }
        catch (error) {
            this.sendCreateUpdateErrorResponse(res, error);
        }
    }
    async authenticate(req, res) {
        const user = await user_1.User.findOne({ email: req.body.email });
        if (!user) {
            return this.sendErrorResponse(res, {
                code: 401,
                message: 'User not found!',
                description: 'Try verifying your email address.',
            });
        }
        if (!(await auth_1.default.comparePasswords(req.body.password, user.password))) {
            return this.sendErrorResponse(res, {
                code: 401,
                message: 'Password does not match!',
            });
        }
        const token = auth_1.default.generateToken(user.toJSON());
        return res.send({ ...user.toJSON(), ...{ token } });
    }
    async me(req, res) {
        const email = req.decoded ? req.decoded.email : undefined;
        const user = await user_1.User.findOne({ email });
        if (!user) {
            return this.sendErrorResponse(res, {
                code: 404,
                message: 'User not found!',
            });
        }
        return res.send({ user });
    }
};
__decorate([
    core_1.Post(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    core_1.Post('authenticate'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "authenticate", null);
__decorate([
    core_1.Get('me'),
    core_1.Middleware(auth_2.authMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "me", null);
UsersController = __decorate([
    core_1.Controller('users')
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.js.map