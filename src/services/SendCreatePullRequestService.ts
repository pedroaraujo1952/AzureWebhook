import 'reflect-metadata';

import { inject, injectable } from 'tsyringe';

import { IMessageEmbed } from '../providers/MessageEmbed/models/IMessageEmbed';
import { IWebhookClient } from '../providers/WebhookClient/models/IWebhookClient';
import { Resource } from '../types/Azure/IPullRequestCreated';
import { DEFAULT_COLOR } from '../utils/EmbedStatusColors';

@injectable()
export class SendCreatePullRequestService {
  constructor(
    @inject('WebhookClient')
    private webhookClient: IWebhookClient,

    @inject('MessageEmbed')
    private messageEmbed: IMessageEmbed,
  ) {}

  public async execute({
    title,
    createdBy,
    reviewers,
    _links,
    repository,
  }: Resource): Promise<void> {
    const responseMessage = `${createdBy.displayName} created [pull request](${_links.web.href}) (${title}) in [${repository.name}](${repository.url})`;

    const embed = this.messageEmbed
      .setTitle(`Uma nova Pull Request foi criada`)
      .setURL(_links.web.href)
      .setDescription(responseMessage)
      .addField(
        'Reviewers',
        reviewers.map(content => content.displayName),
      )
      .setColor(DEFAULT_COLOR);

    this.webhookClient.send([embed]);
  }
}
