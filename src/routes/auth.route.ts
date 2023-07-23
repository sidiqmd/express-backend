import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller';
import {
    verifyAccessToken,
    verifyRefreshToken,
} from '../middlewares/auth.middleware';
import { loginSchema } from '../validations/login.schema';
import { validateMiddleware } from '../middlewares/validate.middleware';
import { registerSchema } from '../validations/register.schema';

export const authRoute: Router = Router();

authRoute.post(
    '/register',
    validateMiddleware(registerSchema),
    AuthController.register
);
authRoute.post('/login', validateMiddleware(loginSchema), AuthController.login);
authRoute.get('/profile', verifyAccessToken, AuthController.profile);
authRoute.post(
    '/refresh-token',
    verifyRefreshToken,
    AuthController.refreshToken
);
