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
    const { status } = environment;

    const url = await this.getURL(environment);

    const embed = this.messageEmbed
      .setDescription(message.markdown)
      .setColor(status === 'succeeded' ? 1879160 : 16711680);

    if (environment.release.name === process.env.ENVIRONMENT_RELEASE_NAME) {
      embed.addField('Deployment URL', url);
    }

    this.webhookClient.send([embed]);
  }

  private async getURL(environment: Environment): Promise<string> {
    if (
      environment.name.toLowerCase() ===
      process.env.ENVIRONMENT_NAME?.toLowerCase()
    ) {
      const {
        data: { deployments },
      } = await axios.get(`${process.env.DEPLOY_PLATFORM_URL}?target=preview`);

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
