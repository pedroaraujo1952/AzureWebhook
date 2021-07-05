export interface PullRequestCommentedOn {
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
  comment: Comment;
  pullRequest: PullRequest;
}

export interface Comment {
  id: number;
  parentCommentId: number;
  author: Author;
  content: string;
  publishedDate: string;
  lastUpdatedDate: string;
  lastContentUpdatedDate: string;
  commentType: string;
  _links: CommentLinks;
}

export interface CommentLinks {
  self: SelfClass;
  repository: SelfClass;
  threads: SelfClass;
}

export interface SelfClass {
  href: string;
}

export interface Author {
  displayName: string;
  url: string;
  id: string;
  uniqueName: string;
  imageUrl: string;
}

export interface PullRequest {
  repository: PullRequestRepository;
  pullRequestId: number;
  status: string;
  createdBy: Author;
  creationDate: string;
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
  _links: PullRequestLinks;
}

export interface PullRequestLinks {
  web: SelfClass;
  statuses: SelfClass;
}

export interface Commit {
  commitId: string;
  url: string;
}

export interface PullRequestRepository {
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
  reviewerUrl: null;
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
