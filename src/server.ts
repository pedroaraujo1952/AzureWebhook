import express from 'express';
import Discord from 'discord.js';

import discordConfig from './config/discord';

const PORT = process.env.port || 3333;

const app = express();

app.use(express.json());

app.get('/', (request, response) => response.send('Its working'));

app.post('/build', (request, response) => {
  const webhookClient = new Discord.WebhookClient(
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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
