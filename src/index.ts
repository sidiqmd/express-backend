import 'express-async-errors';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as hpp from 'hpp';
import * as dotenv from 'dotenv';
import { AppDataSource } from './data-source';
import { logger } from './utils/logger';
import { mainRoute } from './routes/main.route';
import { authRoute } from './routes/auth.route';
import { userRoute } from './routes/user.route';
import { logRequest } from './middlewares/log-request.middleware';
import { errorHandler } from './exceptions/error-handler';

dotenv.config({});

AppDataSource.initialize()
    .then(async () => {
        // create express app
        const app = express();
        app.use(bodyParser.json());

        // setup express app here
        app.disable('x-powered-by'); // disable x-powered-by header
        app.set('trust proxy', 1); // trust first proxy

        app.use(cors()); // enable CORS
        app.use(helmet()); // protect against well known vulnerabilities
        app.use(cookieParser()); // parse cookie header
        app.use(hpp()); // protect against HTTP Parameter
        app.use(express.json()); // parse JSON body
        app.use(express.urlencoded({ extended: true })); // parse URL encoded body

        app.use(logRequest);

        const baseUrl = process.env.BASE_URL || '/api';

        app.use(baseUrl, mainRoute);
        app.use(`${baseUrl}/auth`, authRoute);
        app.use(`${baseUrl}/users`, userRoute);

        app.use(errorHandler);

        const port = process.env.PORT || 3000;
        const env = process.env.NODE_ENV || 'dev';

        // start express server
        app.listen(port, () => {
            logger().info(
                `System is up & running at port:[${port}] in [${env}] mode with base-url:[${baseUrl}]`
            );
        });
    })
    .catch((error) => logger().info('123445444444'));
