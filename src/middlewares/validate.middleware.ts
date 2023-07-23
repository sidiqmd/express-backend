import { NextFunction, Request, Response } from 'express';
import * as _ from 'lodash';
import { IValidatedData } from '../interfaces/validated.interface';
import * as Joi from 'joi';

export const validateMiddleware = (schema: Joi.ObjectSchema) => {
    return (
        request: IValidatedData,
        response: Response,
        next: NextFunction
    ) => {
        const { error, value } = schema.validate(request.body, {
            abortEarly: false,
        });
        if (error) {
            return response
                .status(400)
                .json({ error: _.map(error.details, 'message') });
        }

        request.validatedData = value;

        next();
    };
};
