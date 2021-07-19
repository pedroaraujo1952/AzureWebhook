import 'reflect-metadata';

import { inject, injectable } from 'tsyringe';

import { IWebhookClient } from '../providers/WebhookClient/models/IWebhookClient';
import { IMessageEmbed } from '../providers/MessageEmbed/models/IMessageEmbed';
import { Message, Resource } from '../types/Azure/IPullRequestMerge';
import { STATUS_FAILED, STATUS_SUCCEEDED } from '../utils/EmbedStatusColors';

interface IRequest {
  message: Message;
  resource: Resource;
}

@injectable()
export class SendMergePullRequestService {
  constructor(
    @inject('WebhookClient')
    private webhookClient: IWebhookClient,

    @inject('MessageEmbed')
    private messageEmbed: IMessageEmbed,
  ) {}

  public async execute({ message, resource }: IRequest): Promise<void> {
    const { title, mergeStatus } = resource;

    const embed = this.messageEmbed
      .setTitle('New Merge Attempt')
      .setDescription(message.markdown)
      .addField('Pull Request', title)
      .setColor(mergeStatus === 'succeeded' ? STATUS_SUCCEEDED : STATUS_FAILED);

    await this.webhookClient.send([embed]);
  }
}
