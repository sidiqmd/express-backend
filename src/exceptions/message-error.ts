import { StatusCodes } from 'http-status-codes';

export const MessageError = {
    COMMON: {
        INVALID: {
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            errorCode: 'COMMON.INVALID',
            message: 'Opps unable to process.',
        },
    },
    JWT: {
        EXPIRED: {
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            errorCode: 'JWT.EXPIRED',
            message: 'Token has expired.',
        },
        INVALID: {
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            errorCode: 'JWT.INVALID',
            message: 'Invalid token signature.',
        },
    },
    AUTH: {
        INVALID: {
            statusCode: StatusCodes.BAD_REQUEST,
            errorCode: 'AUTH.INVALID',
            message: 'Invalid email or password.',
        },
        USER_NOT_FOUND: {
            statusCode: StatusCodes.BAD_REQUEST,
            errorCode: 'AUTH.USER_NOT_FOUND',
            message: 'User not found.',
        },
    },
};
