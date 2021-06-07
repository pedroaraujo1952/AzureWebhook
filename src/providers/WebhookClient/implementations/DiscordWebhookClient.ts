import { WebhookClient } from 'discord.js';
import { IMessageEmbed } from '../../MessageEmbed/models/IMessageEmbed';
import { IWebhookClient } from '../models/IWebhookClient';

import discordConfig from '../../../config/discord';

export class DiscordWebhookClient implements IWebhookClient {
  async send(embeds: IMessageEmbed[]): Promise<void> {
    const webhookClient = new WebhookClient(
      discordConfig.webhookId,
      discordConfig.webhookToken,
    );

    await webhookClient.send({
      username: discordConfig.webhookUsername,
      avatarURL: discordConfig.webhookAvatarURL,
      embeds,
    });
  }
}
