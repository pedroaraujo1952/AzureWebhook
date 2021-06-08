import { createLogger, transports, format } from 'winston';
import dotenv from 'dotenv';

dotenv.config();

const customLevel = {
  '[ERROR]': 0,
  '[INFO]': 1,
};

const logger = createLogger({
  levels: customLevel,
  transports: [
    new transports.File({
      level: '[INFO]',
      filename: 'logs/info.log',
      format: format.combine(format.timestamp(), format.simple()),
    }),
    new transports.File({
      level: '[ERROR]',
      filename: 'logs/error.log',
      format: format.combine(format.timestamp(), format.simple()),
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      level: '[INFO]',
      format: format.combine(format.simple()),
    }),
  );
}

export { logger };
