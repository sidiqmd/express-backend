import { IErrorResponse } from '../interfaces/error-response-interface';

class CustomError extends Error {
    name: string;
    statusCode: number;
    errorCode: string;
    message: string;

    constructor(errorResponse: IErrorResponse) {
        const { statusCode, errorCode, message } = errorResponse;
        super(message);

        Object.setPrototypeOf(this, new.target.prototype);

        this.name = 'CustomError';
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.message = message;

        Error.captureStackTrace(this);
    }
}

export { CustomError };
