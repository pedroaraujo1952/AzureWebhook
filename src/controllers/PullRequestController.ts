import { MessageEmbed } from 'discord.js';
import { Request, Response } from 'express';

import { DiscordWebhookClient } from '../providers/WebhookClient/implementations/DiscordWebhookClient';

import { SendCreatePullRequestService } from '../services/PullRequest/sendCreatePullRequestService';
import { SendCommentPullRequestService } from '../services/PullRequest/sendCommentPullRequestService';
import { SendMergePullRequestService } from '../services/PullRequest/sendMergePullRequestService';

import {
  AzurePullRequest,
  AzurePullRequestCommentResource,
  AzurePullRequestCreateResource,
  AzurePullRequestMergeResource,
} from '../types/Azure/PullRequestInterfaces/IPullRequest';

export class PullRequestController {
  public async comment(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const webhookClient = new DiscordWebhookClient();
    const messageEmbed = new MessageEmbed();

    const { message, resource } = request.body as AzurePullRequest;

    const sendCommentPullRequest = new SendCommentPullRequestService(
      webhookClient,
      messageEmbed,
    );

    await sendCommentPullRequest.execute({
      message,
      resource: resource as AzurePullRequestCommentResource,
    });

    return response.send();
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const webhookClient = new DiscordWebhookClient();
    const messageEmbed = new MessageEmbed();

    const { resource } = request.body as AzurePullRequest;

    const sendCreatePullRequest = new SendCreatePullRequestService(
      webhookClient,
      messageEmbed,
    );

    await sendCreatePullRequest.execute(
      resource as AzurePullRequestCreateResource,
    );

    return response.status(204).send();
  }

  public async merge(request: Request, response: Response): Promise<Response> {
    const webhookClient = new DiscordWebhookClient();
    const messageEmbed = new MessageEmbed();

    const { message, resource } = request.body as AzurePullRequest;

    const sendMergePullRequest = new SendMergePullRequestService(
      webhookClient,
      messageEmbed,
    );

    await sendMergePullRequest.execute({
      message,
      resource: resource as AzurePullRequestMergeResource,
    });

    return response.status(204).send();
  }
}
