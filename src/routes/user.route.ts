import { Router } from 'express';
import * as UserController from '../controllers/user.controller';

export const userRoute: Router = Router();

userRoute.get('/random', UserController.random);
