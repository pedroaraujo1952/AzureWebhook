/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { IMessageEmbed } from '../../MessageEmbed/models/IMessageEmbed';
import { IWebhookClient } from '../models/IWebhookClient';

export class FakeWebhookClient implements IWebhookClient {
  public async send(embeds: IMessageEmbed[]): Promise<void> {}
}
