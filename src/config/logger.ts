import { createLogger, transports, format } from 'winston';
import path from 'path';

export const logsPath = path.resolve(__dirname, '..', '..', 'logs');

const customLevel = {
  '[ERROR]': 0,
  '[INFO]': 1,
};

const logger = createLogger({
  levels: customLevel,
  transports: [
    new transports.File({
      filename: 'logs/info.log',
      format: format.combine(format.timestamp(), format.simple()),
      level: '[INFO]',
    }),
    new transports.File({
      filename: 'logs/error.log',
      format: format.combine(format.timestamp(), format.simple()),
      level: '[ERROR]',
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.simple(),
      level: '[INFO]',
    }),
  );
}

export { logger };
