/* eslint-disable @typescript-eslint/naming-convention */

import { Message } from '../IAzure';

export interface AzureBuildResource {
  id: number;
  buildNumber: string;
  url: string;
  status: 'succeeded' | 'failed';
}

export interface AzureBuild {
  id: string;
  eventType: string;
  message: Message;
  detailedMessage: Message;
  resource: AzureBuildResource;
  createdDate: Date;
}
