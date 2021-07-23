import axiosProvider from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const axios = axiosProvider.create({
  timeout: Number(process.env.AXIOS_TIMEOUT) || 5000,
  baseURL: process.env.DEPLOY_PLATFORM_URL || '',
  headers: {
    Authorization: `Bearer ${process.env.DEPLOY_PLATFORM_TOKEN}`,
  },
  params: {
    target: 'preview',
    teamId: process.env.DEPLOY_PLATFORM_TEAM_ID || '',
  },
});
