import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import hpp from 'hpp';
import * as dotenv from 'dotenv';
import { logger } from './utils/logger';
import { mainRoute } from './routes/main.route';

dotenv.config({});

const app = express();

app.disable('x-powered-by'); // disable x-powered-by header
app.set('trust proxy', 1); // trust first proxy

app.use(cors()); // enable CORS
app.use(helmet()); // protect against well known vulnerabilities
app.use(cookieParser()); // parse cookie header
app.use(morgan('dev')); // log HTTP requests
app.use(hpp()); // protect against HTTP Parameter
app.use(express.json()); // parse JSON body
app.use(express.urlencoded({ extended: true })); // parse URL encoded body

const baseUrl = process.env.BASE_URL || '/api/v1';

app.use(baseUrl, mainRoute);
// app.use(`${baseUrl}/auth`, authRoute);
// app.use(`${baseUrl}/category`, categoryRoute);
// app.use(`${baseUrl}/post`, postRoute);
// app.use(`${baseUrl}/membership`, membershipRoute);

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'dev';

app.listen(port, () => {
  logger().info(
    `System is up & running at port:[${port}] in [${env}] mode with base-url:[${baseUrl}]`
  );
});
