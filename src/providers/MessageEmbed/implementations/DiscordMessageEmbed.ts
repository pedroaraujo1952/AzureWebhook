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
}
