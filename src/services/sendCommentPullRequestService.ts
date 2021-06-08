import { IWebhookClient } from '../providers/WebhookClient/models/IWebhookClient';
import { IMessageEmbed } from '../providers/MessageEmbed/models/IMessageEmbed';

import { AzurePullRequestCommentResource } from '../types/Azure/PullRequestInterfaces/IPullRequest';
import { Message } from '../types/Azure/IAzure';

interface IRequest {
  message: Message;
  resource: AzurePullRequestCommentResource;
}

export class SendCommentPullRequestService {
  constructor(
    private webhookClient: IWebhookClient,
    private messageEmbed: IMessageEmbed,
  ) {}

  public async execute({ message, resource }: IRequest): Promise<void> {
    const { comment, pullRequest } = resource;

    const { title } = pullRequest;
    const { author, _links, content } = comment;

    const embed = this.messageEmbed
      .setAuthor(author.displayName, author.imageUrl, author.url)
      .setTitle(`Novo comentário na PR: ${title}`)
      .setURL(_links.self.href)
      .setDescription(message.markdown)
      .addField('Comentário: ', content)
      .setColor(0x3d9df2);

    this.webhookClient.send([embed]);
  }
}
