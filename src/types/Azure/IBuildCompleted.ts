export interface BuildCompleted {
  subscriptionId: string;
  notificationId: number;
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
  markdown: string;
}

export interface Resource {
  uri: string;
  id: number;
  buildNumber: string;
  url: string;
  startTime: string;
  finishTime: string;
  reason: string;
  status: string;
  dropLocation: string;
  drop: Drop;
  log: Drop;
  sourceGetVersion: string;
  lastChangedBy: LastChangedBy;
  retainIndefinitely: boolean;
  hasDiagnostics: boolean;
  definition: Definition;
  queue: Queue;
  requests: Request[];
}

export interface Definition {
  batchSize: number;
  triggerType: string;
  definitionType: string;
  id: number;
  name: string;
  url: string;
}

export interface Drop {
  location?: string;
  type: string;
  url: string;
  downloadUrl: string;
}

export interface LastChangedBy {
  displayName: string;
  url: string;
  id: string;
  uniqueName: string;
  imageUrl: string;
}

export interface Queue {
  queueType: string;
  id: number;
  name: string;
  url: string;
}

export interface Request {
  id: number;
  url: string;
  requestedFor: LastChangedBy;
}

export interface ResourceContainers {
  collection: Account;
  account: Account;
  project: Account;
}

export interface Account {
  id: string;
}
