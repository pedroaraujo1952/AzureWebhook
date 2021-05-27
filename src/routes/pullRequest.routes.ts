import { Router } from 'express';
import { PullRequestController } from '../controllers/PullRequestController';

const prRouter = Router();

const pullRequestController = new PullRequestController();

prRouter.post('/comment', pullRequestController.comment);
prRouter.post('/create', pullRequestController.create);

export { prRouter };
