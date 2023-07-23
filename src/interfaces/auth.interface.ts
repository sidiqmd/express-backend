import { Request } from 'express';
import { User } from '../entities/User';

export interface IPayload {
    sub: string;
}

export interface IAuthRequest extends Request {
    user: User;
}
