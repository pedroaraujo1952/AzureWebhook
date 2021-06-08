import { MessageEmbed } from 'discord.js';
import { Request, Response } from 'express';

import { DiscordWebhookClient } from '../providers/WebhookClient/implementations/DiscordWebhookClient';
import { SendBuildStatusService } from '../services/Build/SendBuildStatusService';

import { AzureBuild } from '../types/Azure/BuildInterfaces/IBuild';

export class BuildController {
  public async index(request: Request, response: Response): Promise<Response> {
    const webhookClient = new DiscordWebhookClient();
    const messageEmbed = new MessageEmbed();

    const { message, resource } = request.body as AzureBuild;

    const sendBuildStatus = new SendBuildStatusService(
      webhookClient,
      messageEmbed,
    );

    await sendBuildStatus.execute({ message, resource });

    return response.status(204).send();
  }
}
