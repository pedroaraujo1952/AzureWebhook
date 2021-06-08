import { IMessageEmbed } from '../../providers/MessageEmbed/models/IMessageEmbed';
import { IWebhookClient } from '../../providers/WebhookClient/models/IWebhookClient';

import { AzurePullRequestCreateResource } from '../../types/Azure/PullRequestInterfaces/IPullRequest';

export class SendCreatePullRequestService {
  constructor(
    private webhookClient: IWebhookClient,
    private messageEmbed: IMessageEmbed,
  ) {}

  public async execute({
    title,
    createdBy,
    reviewers,
    _links,
    repository,
  }: AzurePullRequestCreateResource): Promise<void> {
    const responseMessage = `${createdBy.displayName} created [pull request](${_links.web.href}) (${title}) in [${repository.name}](${repository.url})`;

    const embed = this.messageEmbed
      .setTitle(`Uma nova Pull Request foi criada`)
      .setURL(_links.web.href)
      .setDescription(responseMessage)
      .addField(
        'Reviewers',
        reviewers.map(content => content.displayName),
      )
      .setColor(0x3d9df2);

    this.webhookClient.send([embed]);
  }
}
