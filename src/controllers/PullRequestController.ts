import { MessageEmbed, WebhookClient } from 'discord.js';
import { Request, Response } from 'express';

import discordConfig from '../config/discord';
import { DiscordWebhookClient } from '../providers/WebhookClient/implementations/DiscordWebhookClient';
import { SendCreatePullRequestService } from '../services/PullRequest/sendCreatePullRequestService';
import { AzurePullRequest } from '../types/Azure/PullRequestInterfaces/IPullRequest';

export class PullRequestController {
  public comment(request: Request, response: Response) {
    const webhookClient = new WebhookClient(
      discordConfig.webhookId,
      discordConfig.webhookToken,
    );

    const { message, resource } = request.body;
    const { comment, pullRequest } = resource;

    const { author } = comment;

    const embed = new MessageEmbed()
      .setAuthor(author.displayName, author.imageUrl, author.url)
      .setTitle(`Novo comentário na PR: ${pullRequest.title}`)
      .setURL(comment._links.self.href)
      .setDescription(message.markdown)
      .addField('Comentário: ', comment.content)
      .setColor(0x3d9df2);

    webhookClient.send({
      username: discordConfig.webhookUsername,
      avatarURL: discordConfig.webhookAvatarURL,
      embeds: [embed],
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

    await sendCreatePullRequest.execute(resource);

    return response.status(204).send();
  }

  public merge(request: Request, response: Response) {
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
