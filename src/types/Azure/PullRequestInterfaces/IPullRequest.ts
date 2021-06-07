/* eslint-disable @typescript-eslint/naming-convention */
import { Message } from 'discord.js';

interface Links {
  web: {
    href: string;
  };
}

interface User {
  displayName: string;
  url: string;
  imageUrl: string;
}

interface Repository {
  name: string;
  url: string;
}

export interface AzurePullRequestCreateResource {
  title: string;
  description: string;
  mergeStatus: 'succeeded' | 'failed';
  url: string;
  _links: Links;
  reviewers: User[];
  repository: Repository;
  createdBy: User;
}

export interface AzurePullRequest {
  id: string;
  eventType: string;
  message: Message;
  detailedMessage: Message;
  resource: AzurePullRequestCreateResource;
  createdDate: Date;
}
