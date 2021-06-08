import { IWebhookClient } from '../providers/WebhookClient/models/IWebhookClient';
import { IMessageEmbed } from '../providers/MessageEmbed/models/IMessageEmbed';

import { AzureBuildResource } from '../types/Azure/BuildInterfaces/IBuild';
import { Message } from '../types/Azure/IAzure';

interface IRequest {
  message: Message;
  resource: AzureBuildResource;
}

export class SendBuildStatusService {
  constructor(
    private webhookClient: IWebhookClient,
    private messageEmbed: IMessageEmbed,
  ) {}

  public async execute({ message, resource }: IRequest): Promise<void> {
    const embed = this.messageEmbed
      .setDescription(message.markdown)
      .setColor(resource.status === 'succeeded' ? 1879160 : 16711680);

    this.webhookClient.send([embed]);
  }
}
