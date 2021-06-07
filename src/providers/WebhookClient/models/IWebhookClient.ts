import { IMessageEmbed } from '../../MessageEmbed/models/IMessageEmbed';

export interface IWebhookClient {
  send(embeds: IMessageEmbed[]): Promise<void>;
}
