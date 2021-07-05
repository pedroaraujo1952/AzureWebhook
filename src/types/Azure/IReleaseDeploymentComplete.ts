export interface ReleaseDeploymentComplete {
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
  environment: Environment;
  project: Project;
  deployment: Deployment;
  comment: null;
  data: Data;
  stageName: null;
  attemptId: number;
  id: number;
  url: null;
}

export interface Data {}

export interface Deployment {
  id: number;
  release: Release;
  releaseDefinition: null;
  releaseEnvironment: Release;
  projectReference: null;
  definitionEnvironmentId: number;
  attempt: number;
  reason: string;
  deploymentStatus: string;
  operationStatus: string;
  requestedBy: null;
  startedOn: string;
  completedOn: string;
  lastModifiedOn: string;
  lastModifiedBy: null;
  conditions: any[];
  preDeployApprovals: any[];
  postDeployApprovals: any[];
  _links: Data;
}

export interface Release {
  id: number;
  name: string;
  artifacts?: any[];
  _links: Links;
}

export interface Links {
  web: Web;
}

export interface Web {
  href: string;
}

export interface Environment {
  id: number;
  releaseId: number;
  name: string;
  status: string;
  variables: Data;
  variableGroups: any[];
  preDeployApprovals: any[];
  postDeployApprovals: any[];
  preApprovalsSnapshot: PreApprovalsSnapshot;
  postApprovalsSnapshot: PostApprovalsSnapshot;
  deploySteps: any[];
  rank: number;
  definitionEnvironmentId: number;
  queueId: number;
  environmentOptions: EnvironmentOptions;
  demands: any[];
  conditions: any[];
  modifiedOn: string;
  workflowTasks: any[];
  deployPhasesSnapshot: any[];
  owner: Owner;
  scheduledDeploymentTime: string;
  schedules: any[];
  release: Release;
  releaseDefinition: ReleaseDefinition;
  preDeploymentGatesSnapshot: DeploymentGatesSnapshot;
  postDeploymentGatesSnapshot: DeploymentGatesSnapshot;
}

export interface EnvironmentOptions {
  emailNotificationType: string;
  emailRecipients: string;
  skipArtifactsDownload: boolean;
  timeoutInMinutes: number;
  enableAccessToken: boolean;
  publishDeploymentStatus: boolean;
  badgeEnabled: boolean;
  autoLinkWorkItems: boolean;
  pullRequestDeploymentEnabled: boolean;
}

export interface Owner {
  displayName: string;
  id: string;
}

export interface PostApprovalsSnapshot {
  approvals: any[];
}

export interface DeploymentGatesSnapshot {
  id: number;
  gatesOptions: null;
  gates: any[];
}

export interface PreApprovalsSnapshot {
  approvals: any[];
  approvalOptions: ApprovalOptions;
}

export interface ApprovalOptions {
  requiredApproverCount: number;
  releaseCreatorCanBeApprover: boolean;
  autoTriggeredAndPreviousEnvironmentApprovedCanBeSkipped: boolean;
  enforceIdentityRevalidation: boolean;
  timeoutInMinutes: number;
  executionOrder: string;
}

export interface ReleaseDefinition {
  id: number;
  name: string;
  projectReference: null;
  _links: Data;
}

export interface Project {
  id: string;
  name: string;
}

export interface ResourceContainers {
  collection: Account;
  account: Account;
  project: Account;
}

export interface Account {
  id: string;
}
