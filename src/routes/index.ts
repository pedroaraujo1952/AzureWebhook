import { Router } from 'express';
import { loggingHandler } from '../middlewares/LoggingHandler';

// Routes
import { buildRouter } from './build.routes';
import { prRouter } from './pullRequest.routes';

const router = Router();

router.use(loggingHandler);

router.get('/', (request, response) => response.send('Its working'));

router.use('/pr', prRouter);
router.use('/build', buildRouter);

export { router };
