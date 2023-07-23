import { Request, Response } from 'express';
import * as AuthService from '../services/auth.service';
import { IAuthRequest } from '../interfaces/auth.interface';

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    return res.status(201).json(await AuthService.register(email, password));
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    return res.status(200).json(await AuthService.login(email, password));
};

export const profile = async (req: IAuthRequest, res: Response) => {
    const { user } = req;

    return res.status(200).json(await AuthService.profile(user));
};

export const refreshToken = async (req: IAuthRequest, res: Response) => {
    const { user } = req;

    return res.status(200).json(await AuthService.refreshToken(user));
};
