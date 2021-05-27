import dotenv from 'dotenv';

dotenv.config();

export default {
  webhookId: process.env.DISCORD_WEBHOOK_ID || '',
  webhookToken: process.env.DISCORD_WEBHOOK_TOKEN || '',
  webhookUsername: 'Azure Bot',
  webhookAvatarURL:
    'https://p2zk82o7hr3yb6ge7gzxx4ki-wpengine.netdna-ssl.com/wp-content/uploads/Azure-DevOps-3.png',
};
