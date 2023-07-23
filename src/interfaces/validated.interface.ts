import { IAuthRequest } from './auth.interface';

export interface IValidatedData extends IAuthRequest {
    validatedData: any;
}
