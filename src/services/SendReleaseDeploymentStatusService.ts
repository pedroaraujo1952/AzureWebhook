import 'reflect-metadata';

import { inject, injectable } from 'tsyringe';
import { axios } from '../config/axios';

import { IMessageEmbed } from '../providers/MessageEmbed/models/IMessageEmbed';
import { IWebhookClient } from '../providers/WebhookClient/models/IWebhookClient';
import {
  Environment,
  Message,
  Resource,
} from '../types/Azure/IReleaseDeploymentComplete';
import { STATUS_FAILED, STATUS_SUCCEEDED } from '../utils/EmbedStatusColors';

interface IRequest {
  message: Message;
  resource: Resource;
}

interface IDeployPayload {
  uid: string;
  name: string;
  url: string;
  created: number;
  state: string;
  type: string;
  creator: unknown;
  meta: unknown;
  target: null;
  aliasError: null;
  aliasAssigned: number;
}

@injectable()
export class SendReleaseDeploymentStatusService {
  constructor(
    @inject('WebhookClient')
    private webhookClient: IWebhookClient,

    @inject('MessageEmbed')
    private messageEmbed: IMessageEmbed,
  ) {}

  public async execute({ message, resource }: IRequest): Promise<void> {
    const { environment } = resource;
    const { status, releaseDefinition } = environment;

    const { name: releaseName } = releaseDefinition;

    const embed = this.messageEmbed
      .setTitle(releaseName)
      .setDescription(message.markdown)
      .setColor(status === 'succeeded' ? STATUS_SUCCEEDED : STATUS_FAILED);

    if (
      releaseName === process.env.ENVIRONMENT_RELEASE_NAME &&
      status === 'succeeded'
    ) {
      const url = await this.getURL(environment);
      embed.addField('Deployment URL', url);
    }

    await this.webhookClient.send([embed]);
  }

  private async getURL({ name }: Environment): Promise<string> {
    if (name.toLowerCase() === process.env.ENVIRONMENT_NAME?.toLowerCase()) {
      const axiosURL = `${process.env.DEPLOY_PLATFORM_URL}?target=preview`;

      const {
        data: { deployments },
      } = await axios.get(axiosURL);

      if (!deployments)
        throw new Error('Vercel API does not returned any value');

      const { url }: IDeployPayload = deployments.find(
        (deploy: IDeployPayload) => deploy.name === process.env.DEPLOY_NAME,
      );

      if (!url.includes('http')) {
        return `https://${url}`;
      }

      return url;
    }
    return process.env.PRODUCTION_URL || '';
  }
}
