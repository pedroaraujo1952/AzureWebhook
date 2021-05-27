import { Router } from 'express';

// Routes
import { buildRouter } from './build.routes';
import { prRouter } from './pullRequest.routes';

const router = Router();

router.use('/pr', prRouter);
router.use('/build', buildRouter);

export { router };
