import { Router } from 'express';

import { WebhookClient } from 'discord.js';
import discordConfig from '../config/discord';

const buildRouter = Router();

buildRouter.post('/', (request, response) => {
  const webhookClient = new WebhookClient(
    discordConfig.webhookId,
    discordConfig.webhookToken,
  );

  const { message, resource } = request.body;

  const { url, status } = resource;

  const embed = {
    description: message.markdown,
    color: status === 'succeeded' ? 1879160 : 16711680,
  };

  webhookClient.send({
    username: 'Azure Bot',
    url: url,
    avatarURL:
      'https://p2zk82o7hr3yb6ge7gzxx4ki-wpengine.netdna-ssl.com/wp-content/uploads/Azure-DevOps-3.png',
    embeds: [embed],
  });

  return response.status(204).send();
});

export { buildRouter };
