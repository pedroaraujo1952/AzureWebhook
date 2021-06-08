import { IMessageEmbed } from '../../providers/MessageEmbed/models/IMessageEmbed';
import { IWebhookClient } from '../../providers/WebhookClient/models/IWebhookClient';

import { AzurePullRequestMergeResource } from '../../types/Azure/PullRequestInterfaces/IPullRequest';
import { Message } from '../../types/Azure/IAzure';

interface IRequest {
  message: Message;
  resource: AzurePullRequestMergeResource;
}

export class SendMergePullRequestService {
  constructor(
    private webhookClient: IWebhookClient,
    private messageEmbed: IMessageEmbed,
  ) {}

  public async execute({ message, resource }: IRequest): Promise<void> {
    const { title, mergeStatus } = resource;

    const embed = this.messageEmbed
      .setTitle('New Merge Attempt')
      .setDescription(message.markdown)
      .addField('Pull Request', title)
      .setColor(mergeStatus === 'succeeded' ? 1879160 : 16711680);

    this.webhookClient.send([embed]);
  }
}
