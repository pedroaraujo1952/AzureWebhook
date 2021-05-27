import express from 'express';
import Discord from 'discord.js';

import discordConfig from './config/discord';

const PORT = process.env.port || 3333;

const app = express();

app.use(express.json());

app.post('/', (request, response) => {
  const webhookClient = new Discord.WebhookClient(
    discordConfig.webhookId,
    discordConfig.webhookToken,
  );

  const { detailedMessage, resource } = request.body;

  const { url, lastChangedBy, status } = resource;

  const message = detailedMessage.text;

  const embed = {
    author: {
      name: lastChangedBy.displayName,
      url: lastChangedBy.url,
      icon_url: lastChangedBy.imageUrl,
    },
    description: message,
    color: status === 'succeeded' ? 1879160 : 16711680,
  };

  webhookClient.send({
    username: 'Azure Bot',
    url: url,
    avatarURL:
      'https://p2zk82o7hr3yb6ge7gzxx4ki-wpengine.netdna-ssl.com/wp-content/uploads/Azure-DevOps-3.png',
    embeds: [embed],
  });

  return response.send();
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
