import 'reflect-metadata';

import { inject, injectable } from 'tsyringe';
import { IWebhookClient } from '../providers/WebhookClient/models/IWebhookClient';
import { IMessageEmbed } from '../providers/MessageEmbed/models/IMessageEmbed';
import { Message, Resource } from '../types/Azure/IBuildCompleted';
import { STATUS_FAILED, STATUS_SUCCEEDED } from '../utils/EmbedStatusColors';

interface IRequest {
  message: Message;
  resource: Resource;
}

@injectable()
export class SendBuildStatusService {
  constructor(
    @inject('WebhookClient')
    private webhookClient: IWebhookClient,

    @inject('MessageEmbed')
    private messageEmbed: IMessageEmbed,
  ) {}

  public async execute({ message, resource }: IRequest): Promise<void> {
    const { status } = resource;
    const { markdown } = message;

    const embed = this.messageEmbed
      .setDescription(markdown)
      .setColor(status === 'succeeded' ? STATUS_SUCCEEDED : STATUS_FAILED);

    this.webhookClient.send([embed]);
  }
}
