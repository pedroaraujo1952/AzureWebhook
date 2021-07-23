/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';

import { DiscordMessageEmbed } from '../providers/MessageEmbed/implementations/DiscordMessageEmbed';
import { DiscordWebhookClient } from '../providers/WebhookClient/implementations/DiscordWebhookClient';

import { logger } from '../config/logger';
import { STATUS_FAILED } from '../utils/EmbedStatusColors';

export function globalExceptionHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
): Response {
  const sendMessage = async () => {
    const messageEmbed = new DiscordMessageEmbed();
    const embed = messageEmbed
      .setTitle('An error ocurred')
      .setDescription(
        `See logs for further information\n${process.env.HOST_PRODUCTION_URL}/logs/error.log`,
      )
      .setColor(STATUS_FAILED);

    const webhookClient = new DiscordWebhookClient();
    await webhookClient.send([embed]);
  };

  logger.log('[ERROR]', error.stack);

  sendMessage();

  return response.status(500).json({
    status: 'error',
    message: error.stack,
  });
}
