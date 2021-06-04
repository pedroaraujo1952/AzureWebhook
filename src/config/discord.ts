import dotenv from 'dotenv';

dotenv.config();

export default {
  webhookId: process.env.DISCORD_WEBHOOK_ID || '',
  webhookToken: process.env.DISCORD_WEBHOOK_TOKEN || '',
  webhookUsername: process.env.DISCORD_WEBHOOK_USERNAME || '',
  webhookAvatarURL: process.env.DISCORD_WEBHOOK_IMAGE_URL || '',
};
