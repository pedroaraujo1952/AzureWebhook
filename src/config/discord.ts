import dotenv from 'dotenv';

dotenv.config();

export default {
  webhookId: process.env.DISCORD_WEBHOOK_ID || '',
  webhookToken: process.env.DISCORD_WEBHOOK_TOKEN || '',
  webhookUsername: 'Azure Bot',
  webhookAvatarURL:
    'https://lh3.googleusercontent.com/proxy/bhj17pNLKTQ95y8kM4waSIflevf9lfQ0EaNw_w9wO__hS9x_QpruI964ZB8mlIfd53LaKIL5nY5hG3HbVUrGHQdkwb9p_QmAJ96M1IMMy4Iz0Svgjq_6IBu8tfncomd_Pmx-',
};
