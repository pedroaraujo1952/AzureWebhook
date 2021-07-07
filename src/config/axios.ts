import axiosProvider from 'axios';

export const axios = axiosProvider.create({
  timeout: Number(process.env.AXIOS_TIMEOUT) || 1000,
  baseURL: process.env.DEPLOY_PLATFORM_URL || '',
  headers: {
    Authorization: `Bearer ${process.env.DEPLOY_PLATFORM_TOKEN}`,
  },
});
