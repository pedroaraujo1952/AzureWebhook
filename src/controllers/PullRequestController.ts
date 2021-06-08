import { MessageEmbed, WebhookClient } from 'discord.js';
import { Request, Response } from 'express';

import discordConfig from '../config/discord';
import { DiscordWebhookClient } from '../providers/WebhookClient/implementations/DiscordWebhookClient';
import { SendCreatePullRequestService } from '../services/PullRequest/sendCreatePullRequestService';
import { SendCommentPullRequestService } from '../services/PullRequest/sendCommentPullRequestService';
import {
  AzurePullRequestComment,
  AzurePullRequestCreate,
} from '../types/Azure/PullRequestInterfaces/IPullRequest';

export class PullRequestController {
  public async comment(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const webhookClient = new DiscordWebhookClient();
    const messageEmbed = new MessageEmbed();

    const { message, resource } = request.body as AzurePullRequestComment;

    const sendCommentPullRequest = new SendCommentPullRequestService(
      webhookClient,
      messageEmbed,
    );

    await sendCommentPullRequest.execute({ message, resource });

    return response.send();
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const webhookClient = new DiscordWebhookClient();
    const messageEmbed = new MessageEmbed();

    const { resource } = request.body as AzurePullRequestCreate;

    const sendCreatePullRequest = new SendCreatePullRequestService(
      webhookClient,
      messageEmbed,
    );

    await sendCreatePullRequest.execute(resource);

    return response.status(204).send();
  }

  public async merge(request: Request, response: Response): Promise<Response> {
    const webhookClient = new WebhookClient(
      discordConfig.webhookId,
      discordConfig.webhookToken,
    );

    const { message, resource } = request.body;

    const embed = new MessageEmbed()
      .setTitle('New Merge Attempt')
      .setDescription(message.markdown)
      .addField('Pull Request', resource.title)
      .setColor(resource.mergeStatus === 'succeeded' ? 1879160 : 16711680);

    webhookClient.send({
      username: discordConfig.webhookUsername,
      avatarURL: discordConfig.webhookAvatarURL,
      embeds: [embed],
    });

    return response.send();
  }
}
