import { MessageEmbed, WebhookClient } from 'discord.js';
import { Router } from 'express';

import discordConfig from '../config/discord';

const prRouter = Router();

prRouter.post('/comment', (request, response) => {
  const webhookClient = new WebhookClient(
    discordConfig.webhookId,
    discordConfig.webhookToken,
  );

  const { message, resource } = request.body;

  const { comment, pullRequest } = resource;

  const embed = new MessageEmbed()
    .setTitle(`Novo comentário na PR ${pullRequest.title}`)
    .setURL(comment._links.self.href)
    .setDescription(message.markdown)
    .addField('Comentário: ', comment.content)
    .setColor(0x3d9df2);

  webhookClient.send({
    username: 'Azure Bot',
    avatarURL:
      'https://p2zk82o7hr3yb6ge7gzxx4ki-wpengine.netdna-ssl.com/wp-content/uploads/Azure-DevOps-3.png',
    embeds: [embed],
  });

  return response.send();
});

export { prRouter };
