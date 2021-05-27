import { Router } from 'express';

import { BuildController } from '../controllers/BuildController';

const buildRouter = Router();

const buildController = new BuildController();

buildRouter.post('/', buildController.index);

export { buildRouter };
