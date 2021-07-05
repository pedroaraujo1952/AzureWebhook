import { MessageEmbed } from 'discord.js';
import { Request, Response } from 'express';

import { DiscordWebhookClient } from '../providers/WebhookClient/implementations/DiscordWebhookClient';

import { SendCreatePullRequestService } from '../services/sendCreatePullRequestService';
import { SendCommentPullRequestService } from '../services/sendCommentPullRequestService';
import { SendMergePullRequestService } from '../services/sendMergePullRequestService';
import { PullRequestCommentedOn } from '../types/Azure/IPullRequestCommentedOn';
import { PullRequestCreated } from '../types/Azure/IPullRequestCreated';
import { PullRequestMerge } from '../types/Azure/IPullRequestMerge';

export class PullRequestController {
  public async comment(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const webhookClient = new DiscordWebhookClient();
    const messageEmbed = new MessageEmbed();

    const { message, resource } = request.body as PullRequestCommentedOn;

    const sendCommentPullRequest = new SendCommentPullRequestService(
      webhookClient,
      messageEmbed,
    );

    await sendCommentPullRequest.execute({
      message,
      resource,
    });

    return response.send();
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const webhookClient = new DiscordWebhookClient();
    const messageEmbed = new MessageEmbed();

    const { resource } = request.body as PullRequestCreated;

    const sendCreatePullRequest = new SendCreatePullRequestService(
      webhookClient,
      messageEmbed,
    );

    await sendCreatePullRequest.execute(resource);

    return response.status(204).send();
  }

  public async merge(request: Request, response: Response): Promise<Response> {
    const webhookClient = new DiscordWebhookClient();
    const messageEmbed = new MessageEmbed();

    const { message, resource } = request.body as PullRequestMerge;

    const sendMergePullRequest = new SendMergePullRequestService(
      webhookClient,
      messageEmbed,
    );

    await sendMergePullRequest.execute({
      message,
      resource,
    });

    return response.status(204).send();
  }
}
