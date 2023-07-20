// const winston = require('winston');
// const path = require('path');
// const getCallerFile = require('get-caller-file');
import winston from 'winston';
import path from 'path';
import getCallerFile from 'get-caller-file';

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
