import { MessageEmbed } from 'discord.js';

import { IMessageEmbed } from '../models/IMessageEmbed';

export class DiscordMessageEmbed implements IMessageEmbed {
  private messageEmbed: MessageEmbed;

  constructor() {
    this.messageEmbed = new MessageEmbed();
  }

  setDescription(description: string): IMessageEmbed {
    return this.messageEmbed.setDescription(description);
  }

  setColor(color: string | number): IMessageEmbed {
    return this.messageEmbed.setColor(color);
  }

  addField(title: string, field: string | string[]): IMessageEmbed {
    return this.messageEmbed.addField(title, field);
  }

  setTitle(title: string): IMessageEmbed {
    return this.messageEmbed.setTitle(title);
  }

  setURL(url: string): IMessageEmbed {
    return this.messageEmbed.setURL(url);
  }

  setAuthor(
    name: string,
    iconUrl?: string | undefined,
    url?: string | undefined,
  ): IMessageEmbed {
    return this.messageEmbed.setAuthor(name, iconUrl, url);
  }
}
