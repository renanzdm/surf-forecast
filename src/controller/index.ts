import { CustomValidate } from "@src/models/user";
import { Response } from "express";
import mongoose from "mongoose";

export abstract class BaseController {
    protected sendCreatedUpdateErrorResponse(res: Response, error: mongoose.Error.ValidationError | Error): void {
        if (error instanceof mongoose.Error.ValidationError) {
            const handleError = this.handleClientErrors(error);
            res.status(handleError.code).send({ code: handleError.code, error: handleError.error });
        }
        else {
            res.status(500).send({ code: 500, error: 'Something went wrong' });
        }


    }

    private handleClientErrors(error: mongoose.Error.ValidationError): { code: number, error: string } {
        const duplicatedKindErrors = Object.values(error.errors).filter((err) => err.kind === CustomValidate.DUPICATED);
        if (duplicatedKindErrors.length) {

            return ({ code: 409, error: error.message });
        } else {
            return ({ code: 422, error: error.message });
        }
    }


}