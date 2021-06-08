import { NextFunction, Request, Response } from 'express';
import { logger } from '../config/logger';

export function loggingHandler(
  request: Request,
  response: Response,
  next: NextFunction,
): unknown {
  const { originalUrl, method } = request;

  const logMessage = `[${method}] ${originalUrl}`;

  logger.log('[INFO]', logMessage);

  return next();
}
