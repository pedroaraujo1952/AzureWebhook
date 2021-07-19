import 'reflect-metadata';
import 'express-async-errors';
import dotenv from 'dotenv';

import express from 'express';
import { logger, logsPath } from './config/logger';

import { router } from './routes';

import './containers';

import { globalExceptionHandler } from './middlewares/GlobalExceptionHandler';

dotenv.config();

const PORT = process.env.PORT || 3333;

const app = express();

app.use(express.json());
app.use('/logs', express.static(logsPath));
app.use(router);

app.use(globalExceptionHandler);

app.listen(PORT, () =>
  logger.log('[INFO]', `🚀 Server running on port ${PORT}`),
);
