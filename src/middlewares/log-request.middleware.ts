import { NextFunction, Request, Response } from 'express';
import { logger } from '../utils/logger';

export const logRequest = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const startTimestamp = Date.now(); // Capture the start timestamp

    response.on('finish', () => {
        const endTimestamp = Date.now(); // Capture the end timestamp
        const timeTaken = endTimestamp - startTimestamp; // Calculate the time taken

        logger().info(
            `logRequest --> ${request.method} ${request.originalUrl} ${startTimestamp} - ${response.statusCode} - ${timeTaken}ms`
        );
    });

    next();
};
