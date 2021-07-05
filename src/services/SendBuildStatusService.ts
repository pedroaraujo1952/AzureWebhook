import 'reflect-metadata';

import { inject, injectable } from 'tsyringe';
import { IWebhookClient } from '../providers/WebhookClient/models/IWebhookClient';
import { IMessageEmbed } from '../providers/MessageEmbed/models/IMessageEmbed';
import { Message, Resource } from '../types/Azure/IBuildCompleted';

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
    const embed = this.messageEmbed
      .setDescription(message.markdown)
      .setColor(resource.status === 'succeeded' ? 1879160 : 16711680);

    this.webhookClient.send([embed]);
  }
}
