import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { IPayload } from '../interfaces/auth.interface';
import { logger } from '../utils/logger';
import { CustomError } from '../exceptions/custom-error';
import { MessageError } from '../exceptions/message-error';

/**
 * The `register` function is an asynchronous function that creates a new user with the provided email
 * and password, hashes the password using bcrypt, sets the creation date, saves the user to the
 * database, and returns the created user.
 * @param {string} email - A string representing the email address of the user being registered.
 * @param {string} password - The `password` parameter is a string that represents the user's password.
 * @returns the user object that was created and saved in the database.
 */
export const register = async (email: string, password: string) => {
    logger().info('register.service');

    const user = new User();
    user.email = email;
    user.password = await bcrypt.hash(password, 10);
    user.createdAt = new Date();

    await AppDataSource.manager.save(user);

    return user;
};

/**
 * The function generates an access token using a payload and a secret key, with an expiration time of
 * 15 minutes.
 * @param {IPayload} payload - The `payload` parameter is an object that contains the data that you
 * want to include in the access token. This data can be any information that you want to associate
 * with the token, such as user details or permissions.
 * @returns The function `generateAccessToken` is returning a JSON Web Token (JWT) that is signed with
 * the provided payload and the access token key from the environment variables. The token has an
 * expiration time of 15 minutes.
 */
const generateAccessToken = (payload: IPayload) => {
    logger().info('generateAccessToken');

    return jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
        expiresIn: '15m',
    });
};

/**
 * The function generates a refresh token using a payload and a secret key, and sets an expiration time
 * of 30 days.
 * @param {IPayload} payload - The `payload` parameter is an object that contains the data that you
 * want to include in the refresh token. This data can be any information that you want to associate
 * with the token, such as the user's ID, role, or any other relevant information.
 * @returns a JSON Web Token (JWT) that is generated using the `jwt.sign` method. The token is signed
 * using the `process.env.REFRESH_TOKEN_KEY` as the secret key and it has an expiration time of 30
 * days.
 */
const generateRefreshToken = (payload: IPayload) => {
    logger().info('generateRefreshToken');

    return jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, {
        expiresIn: '30d',
    });
};

/**
 * The login function takes an email and password as parameters, checks if the user exists and if the
 * password is correct, and returns access and refresh tokens if successful.
 * @param {string} email - The `email` parameter is a string that represents the user's email address.
 * It is used to find the user in the database and verify their identity during the login process.
 * @param {string} password - The `password` parameter is a string that represents the user's password.
 * @returns an object with two properties: "accessToken" and "refreshToken".
 */
export const login = async (email: string, password: string) => {
    logger().info('login.service');

    const user = await AppDataSource.manager.findOneBy(User, { email });

    if (!user) {
        throw new CustomError(MessageError.AUTH.USER_NOT_FOUND);
    }

    if (!(await bcrypt.compare(password, user.password))) {
        throw new CustomError(MessageError.AUTH.INVALID);
    }

    return {
        accessToken: generateAccessToken({ sub: user.id }),
        refreshToken: generateRefreshToken({ sub: user.id }),
    };
};

/**
 * The `profile` function takes a user object as input and returns a simplified profile object with
 * selected properties.
 * @param {User} user - The `user` parameter is an object of type `User`. It likely contains
 * information about a user, such as their id, email, createdAt (the date and time when the user was
 * created), and lastLoginAt (the date and time of the user's last login).
 * @returns an object with the following properties:
 * - id: the id of the user
 * - email: the email of the user
 * - createdAt: the date and time when the user was created
 * - lastLoginAt: the date and time of the user's last login
 */
export const profile = async (user: User) => {
    logger().info('profile.service');

    return {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
        lastLoginAt: user.lastLoginAt,
    };
};

/**
 * The function refreshToken generates a new access token and refresh token for a given user.
 * @param {User} user - The `user` parameter is an object of type `User`. It likely contains
 * information about the user, such as their ID, name, email, etc.
 * @returns The function `refreshToken` is returning an object with two properties: `accessToken` and
 * `refreshToken`. The values of these properties are generated using the functions
 * `generateAccessToken` and `generateRefreshToken` respectively.
 */
export const refreshToken = async (user: User) => {
    logger().info('refreshToken.service');

    return {
        accessToken: generateAccessToken({ sub: user.id }),
        refreshToken: generateRefreshToken({ sub: user.id }),
    };
};
