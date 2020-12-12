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
const index_1 = require("@src/controller/index");
const auth_1 = __importDefault(require("@src/services/auth"));
let UsersController = class UsersController extends index_1.BaseController {
    async create(req, res) {
        try {
            const user = new user_1.User(req.body);
            const newUser = await user.save();
            res.status(201).send(newUser);
        }
        catch (err) {
            this.sendCreatedUpdateErrorResponse(res, err);
        }
    }
    async authenticate(req, res) {
        const { email, password } = req.body;
        const user = await user_1.User.findOne({ email });
        if (!user) {
            return res.status(401).send({
                code: 401, error: 'User not found'
            });
        }
        if (!(await auth_1.default.comparePasswords(password, user.password))) {
            return res.status(401).send({
                code: 401, error: 'Passwor not match'
            });
        }
        const token = auth_1.default.generateToken(user.toJSON());
        return res.status(200).send({
            user: user,
            token: token
        });
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
UsersController = __decorate([
    core_1.Controller('users')
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.js.map