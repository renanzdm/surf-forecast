import { Controller, Post } from '@overnightjs/core';
import { Response, Request } from 'express';
import { User } from '@src/models/user';
import { BaseController } from '@src/controller/index';
import AuthService from '@src/services/auth';

@Controller('users')
export class UsersController extends BaseController {
    @Post('')
    public async create(req: Request, res: Response): Promise<void> {
        try {
            const user = new User(req.body);
            const newUser = await user.save();
            res.status(201).send(newUser);
        } catch (err) {
            this.sendCreatedUpdateErrorResponse(res, err);

        }
    }

    @Post('authenticate')
    public async authenticate(req: Request, res: Response): Promise<Response | undefined> {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send({
                code: 401, error: 'User not found'
            });
        }
        if (!(await AuthService.comparePasswords(password, user.password))) {
            return res.status(401).send({
                code: 401, error: 'Passwor not match'
            });
        }
        const token = AuthService.generateToken(user.toJSON());
        return res.status(200).send({
            user: user,
            token: token
        })
    }



}