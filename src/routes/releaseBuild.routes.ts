import { Router } from 'express';

import { ReleaseBuildController } from '../controllers/ReleaseBuildController';

const releaseBuildRouter = Router();

const releaseBuildController = new ReleaseBuildController();

releaseBuildRouter.post('/', releaseBuildController.index);

export { releaseBuildRouter };
