import { MessageEmbed, WebhookClient } from 'discord.js';
import { Request, Response } from 'express';

import discordConfig from '../config/discord';

export class BuildController {
  private webhookClient: WebhookClient;

  constructor() {
    this.webhookClient = new WebhookClient(
      discordConfig.webhookId,
      discordConfig.webhookToken,
    );
  }

  public index(request: Request, response: Response) {
    const { message, resource } = request.body;

    const embed = new MessageEmbed()
      .setDescription(message.markdown)
      .setColor(resource.status === 'succeeded' ? 1879160 : 16711680);

    this.webhookClient.send({
      username: discordConfig.webhookUsername,
      avatarURL: discordConfig.webhookAvatarURL,
      embeds: [embed],
    });

    return response.status(204).send();
  }
}
