import { ClassMiddleware, Controller, Post } from '@overnightjs/core';
import { authMiddleware } from '@src/middlewares/auth';
import { Beach } from '@src/models/beach';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

@Controller('beaches')
@ClassMiddleware(authMiddleware)
export class BeachesController {
    @Post('')
    public async create(req: Request, res: Response): Promise<void> {
        try {
            const beach = new Beach({ ...req.body, ...{ user: req.decoded?.id } });
            const result = await beach.save()
            console.log(result);


            res.status(201).send(result);
        } catch (err) {

            if (err instanceof mongoose.Error.ValidationError) {
                res.status(422).send({ error: err.message });
            } else {
                res.status(500).send('Internal Server Error');
            }
        }
    }
}
