/* eslint-disable @typescript-eslint/naming-convention */

import { Message } from '../IAzure';

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

interface Comment {
  id: number;
  author: User;
  content: string;
  _links: {
    self: {
      href: string;
    };
  };
}

interface PullRequest {
  repository: Repository;
  createdBy: User;
  title: string;
  description: string;
  mergeStatus: 'succeeded' | 'failed';
  reviewers: User[];
}

export interface AzurePullRequestCommentResource {
  comment: Comment;
  pullRequest: PullRequest;
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

export interface AzurePullRequestComment {
  id: string;
  eventType: string;
  message: Message;
  detailedMessage: Message;
  resource: AzurePullRequestCommentResource;
  createdDate: Date;
}

export interface AzurePullRequestCreate {
  id: string;
  eventType: string;
  message: Message;
  detailedMessage: Message;
  resource: AzurePullRequestCreateResource;
  createdDate: Date;
}
