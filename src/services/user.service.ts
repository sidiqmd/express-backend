import axios from 'axios';
import { logger } from '../utils/logger';

type User = {
    gender: 'female' | 'male';
    name: {
        title: 'Miss';
        first: 'Jennie';
        last: 'Nichols';
    };
    location: {
        street: {
            number: number;
            name: string;
        };
        city: string;
        state: string;
        country: string;
        postcode: string;
        coordinates: {
            latitude: string;
            longitude: string;
        };
        timezone: {
            offset: string;
            description: string;
        };
    };
    email: string;
    login: {
        uuid: string;
        username: string;
        password: string;
        salt: string;
        md5: string;
        sha1: string;
        sha256: string;
    };
    dob: {
        date: string;
        age: number;
    };
    registered: {
        date: string;
        age: number;
    };
    phone: string;
    cell: string;
    id: {
        name: string;
        value: string;
    };
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };
    nat: string;
};

type ResultInfo = {
    seed: string;
    results: number;
    page: number;
    version: string;
};

type GetUsersResponse = {
    results: User[];
    info: ResultInfo;
};

/**
 * The function `random` makes an asynchronous HTTP GET request to the 'https://randomuser.me/api/'
 * endpoint and returns the response data if successful, or an error message if an error occurs.
 * @returns The function `random` returns the data received from the API call if the request is
 * successful. If there is an error, it returns the error message if it is an Axios error, or a generic
 * error message if it is an unexpected error.
 */
export const random = async () => {
    logger().info('register.service');

    try {
        const { data, status } = await axios.get<GetUsersResponse>(
            'https://randomuser.me/api/',
            {
                headers: {
                    Accept: 'application/json',
                },
            }
        );

        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            logger().error(error.message);
            return error.message;
        } else {
            logger().error(error);
            return 'An unexpected error occurred';
        }
    }
};
