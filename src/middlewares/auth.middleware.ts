import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import { IAuthRequest, IPayload } from '../interfaces/auth.interface';
import { logger } from '../utils/logger';
import { CustomError } from '../exceptions/custom-error';
import { MessageError } from '../exceptions/message-error';

export const verifyAccessToken = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    logger().info('verifyAccessToken');

    const authHeader = request.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1];

    if (!accessToken) {
        return response.status(401).json({
            message: 'Access Denied',
        });
    }

    try {
        const userRepository = AppDataSource.getRepository(User);
        const decoded = jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN_KEY
        ) as IPayload;
        const userId: string = decoded.sub;

        if (!userId) {
            return response.status(401).json({
                message: 'Access Denied',
            });
        }

        const user = await userRepository.findOneBy({ id: userId });

        if (!user) {
            return response.status(401).json({
                message: 'Access Denied',
            });
        }

        (request as IAuthRequest).user = user;

        next();
    } catch (error) {
        logger().error(error.message);
        if (error.message === 'jwt expired') {
            throw new CustomError(MessageError.JWT.EXPIRED);
        }
    }
};

export const verifyRefreshToken = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    logger().info('verifyRefreshToken');

    const authHeader = request.headers['authorization'];
    const refreshToken = authHeader && authHeader.split(' ')[1];

    if (!refreshToken) {
        return response.status(401).json({
            message: 'Access Denied',
        });
    }

    try {
        const userRepository = AppDataSource.getRepository(User);
        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_KEY
        ) as IPayload;
        const userId: string = decoded.sub;

        if (!userId) {
            return response.status(401).json({
                message: 'Access Denied',
            });
        }

        const user = await userRepository.findOneBy({ id: userId });

        if (!user) {
            return response.status(401).json({
                message: 'Access Denied',
            });
        }

        (request as IAuthRequest).user = user;

        next();
    } catch (error) {
        logger().error(error.message);
        return response.status(401).json({
            message: error.message,
        });
    }
};
