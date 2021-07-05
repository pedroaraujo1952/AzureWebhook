import { container } from 'tsyringe';

import { IMessageEmbed } from './MessageEmbed/models/IMessageEmbed';
import { DiscordMessageEmbed } from './MessageEmbed/implementations/DiscordMessageEmbed';

import { IWebhookClient } from './WebhookClient/models/IWebhookClient';
import { DiscordWebhookClient } from './WebhookClient/implementations/DiscordWebhookClient';

container.registerSingleton<IWebhookClient>(
  'WebhookClient',
  DiscordWebhookClient,
);

container.registerSingleton<IMessageEmbed>('MessageEmbed', DiscordMessageEmbed);
