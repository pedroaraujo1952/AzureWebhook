import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SendCreatePullRequestService } from '../services/SendCreatePullRequestService';
import { SendCommentPullRequestService } from '../services/SendCommentPullRequestService';
import { SendMergePullRequestService } from '../services/SendMergePullRequestService';

import { PullRequestCommentedOn } from '../types/Azure/IPullRequestCommentedOn';
import { PullRequestCreated } from '../types/Azure/IPullRequestCreated';
import { PullRequestMerge } from '../types/Azure/IPullRequestMerge';

export class PullRequestController {
  public async comment(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { message, resource } = request.body as PullRequestCommentedOn;

    const sendCommentPullRequest = container.resolve(
      SendCommentPullRequestService,
    );

    await sendCommentPullRequest.execute({
      message,
      resource,
    });

    return response.status(204).send();
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { resource } = request.body as PullRequestCreated;

    const sendCreatePullRequest = container.resolve(
      SendCreatePullRequestService,
    );

    await sendCreatePullRequest.execute(resource);

    return response.status(204).send();
  }

  public async merge(request: Request, response: Response): Promise<Response> {
    const { message, resource } = request.body as PullRequestMerge;

    const sendMergePullRequest = container.resolve(SendMergePullRequestService);

    await sendMergePullRequest.execute({
      message,
      resource,
    });

    return response.status(204).send();
  }
}
