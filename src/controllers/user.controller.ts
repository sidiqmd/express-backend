import { Request, Response } from 'express';
import * as UserService from '../services/user.service';

export const random = async (req: Request, res: Response) => {
    return res.status(201).json(await UserService.random());
};
