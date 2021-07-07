import 'reflect-metadata';

import { inject, injectable } from 'tsyringe';

import { IWebhookClient } from '../providers/WebhookClient/models/IWebhookClient';
import { IMessageEmbed } from '../providers/MessageEmbed/models/IMessageEmbed';
import { Message, Resource } from '../types/Azure/IPullRequestCommentedOn';

interface IRequest {
  message: Message;
  resource: Resource;
}

@injectable()
export class SendCommentPullRequestService {
  constructor(
    @inject('WebhookClient')
    private webhookClient: IWebhookClient,

    @inject('MessageEmbed')
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
