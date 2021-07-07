import 'reflect-metadata';
import dotenv from 'dotenv';

import express from 'express';
import { logger } from './config/logger';

import { router } from './routes';

import './containers';

dotenv.config();

const PORT = process.env.PORT || 3333;

const app = express();

app.use(express.json());

app.use(router);

app.listen(PORT, () =>
  logger.log('[INFO]', `🚀 Server running on port ${PORT}`),
);
