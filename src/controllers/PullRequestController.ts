import { MessageEmbed, WebhookClient } from 'discord.js';
import { Request, Response } from 'express';

import discordConfig from '../config/discord';

export class PullRequestController {
  public comment(request: Request, response: Response) {
    const webhookClient = new WebhookClient(
      discordConfig.webhookId,
      discordConfig.webhookToken,
    );

    const { message, resource } = request.body;
    const { comment, pullRequest } = resource;

    const { author } = comment;

    const embed = new MessageEmbed()
      .setAuthor(author.displayName, author.imageUrl, author.url)
      .setTitle(`Novo comentário na PR ${pullRequest.title}`)
      .setURL(comment._links.self.href)
      .setDescription(message.markdown)
      .addField('Comentário: ', comment.content)
      .setColor(0x3d9df2);

    webhookClient.send({
      username: discordConfig.webhookUsername,
      avatarURL: discordConfig.webhookAvatarURL,
      embeds: [embed],
    });

    return response.send();
  }

  public create(request: Request, response: Response) {
    const webhookClient = new WebhookClient(
      discordConfig.webhookId,
      discordConfig.webhookToken,
    );

    const { message, resource } = request.body;
    const { title } = resource;

    const reviewers: any[] = resource.reviewers;

    const embed = new MessageEmbed()
      .setTitle(`Uma nova Pull Request foi criada`)
      .setURL(resource._links.web.href)
      .setDescription(message.markdown + `\nPull Request Name: ${title}`)
      .addField(
        'Reviewers',
        reviewers.map((content, index) => content.displayName),
      )
      .setColor(0x3d9df2);

    webhookClient.send({
      username: discordConfig.webhookUsername,
      avatarURL: discordConfig.webhookAvatarURL,
      embeds: [embed],
    });

    return response.send();
  }
}
