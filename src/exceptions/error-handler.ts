import { NextFunction, Request, Response } from 'express';
import { CustomError } from './custom-error';

export function errorHandler(
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
) {
    // Default error code and message
    let statusCode = 500;
    let errorCode = 'INTERNAL_ERROR';
    let message = 'Internal Error';

    // Check if the error object has custom statusCode, errorCode, and message properties
    if (err.name && err.name === 'CustomError') {
        statusCode = err.statusCode;
        errorCode = err.errorCode;
        message = err.message;
    } else {
        message = err.message;
    }

    res.status(statusCode).json({
        statusCode,
        errorCode,
        message,
    });
}
