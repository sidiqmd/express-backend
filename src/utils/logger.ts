import * as winston from 'winston';
import * as path from 'path';
import * as getCallerFile from 'get-caller-file';

const getComponent = (filenameWithPath: string) => {
    return {
        component: path.basename(filenameWithPath),
    };
};

const winstonLogger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
});

winstonLogger.info('Logger started...');

export const logger = () => {
    winstonLogger.defaultMeta = getComponent(getCallerFile());
    return winstonLogger;
};
