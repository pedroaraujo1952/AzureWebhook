export interface PullRequestMerge {
  id: string;
  eventType: string;
  publisherId: string;
  message: Message;
  detailedMessage: Message;
  resource: Resource;
  resourceVersion: string;
  resourceContainers: ResourceContainers;
  createdDate: string;
}

export interface Message {
  text: string;
  html: string;
  markdown: string;
}

export interface Resource {
  repository: Repository;
  pullRequestId: number;
  status: string;
  createdBy: CreatedBy;
  creationDate: string;
  closedDate: string;
  title: string;
  description: string;
  sourceRefName: string;
  targetRefName: string;
  mergeStatus: string;
  mergeId: string;
  lastMergeSourceCommit: Commit;
  lastMergeTargetCommit: Commit;
  lastMergeCommit: Commit;
  reviewers: Reviewer[];
  commits: Commit[];
  url: string;
  _links: Links;
}

export interface Links {
  web: Statuses;
  statuses: Statuses;
}

export interface Statuses {
  href: string;
}

export interface Commit {
  commitId: string;
  url: string;
}

export interface CreatedBy {
  displayName: string;
  url: string;
  id: string;
  uniqueName: string;
  imageUrl: string;
}

export interface Repository {
  id: string;
  name: string;
  url: string;
  project: Project;
  defaultBranch: string;
  remoteUrl: string;
}

export interface Project {
  id: string;
  name: string;
  url: string;
  state: string;
  visibility: string;
  lastUpdateTime: string;
}

export interface Reviewer {
  reviewerUrl: string;
  vote: number;
  displayName: string;
  url: string;
  id: string;
  uniqueName: string;
  imageUrl: string;
  isContainer: boolean;
}

export interface ResourceContainers {
  collection: Account;
  account: Account;
  project: Account;
}

export interface Account {
  id: string;
}
