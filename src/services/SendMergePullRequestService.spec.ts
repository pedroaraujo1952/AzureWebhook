import { DiscordMessageEmbed } from '../providers/MessageEmbed/implementations/DiscordMessageEmbed';
import { FakeWebhookClient } from '../providers/WebhookClient/fakes/FakeWebhookClient';
import { IWebhookClient } from '../providers/WebhookClient/models/IWebhookClient';
import { IMessageEmbed } from '../providers/MessageEmbed/models/IMessageEmbed';

import { SendMergePullRequestService } from './SendMergePullRequestService';

import { PullRequestMerge, Resource } from '../types/Azure/IPullRequestMerge';

let fakeWebhookClient: IWebhookClient;
let fakeMessageEmbed: IMessageEmbed;

let sendMergePullRequest: SendMergePullRequestService;

describe('SendMergePullRequestController', () => {
  beforeEach(() => {
    fakeWebhookClient = new FakeWebhookClient();
    fakeMessageEmbed = new DiscordMessageEmbed();

    sendMergePullRequest = new SendMergePullRequestService(
      fakeWebhookClient,
      fakeMessageEmbed,
    );
  });

  it('should be able to send merge success pull request message', async () => {
    const resource = {
      title: 'some-title',
      mergeStatus: 'succeeded',
    } as Resource;

    const { message } = {
      message: {
        markdown: 'some-message',
      },
      resource,
    } as PullRequestMerge;

    const setTitle = jest.spyOn(fakeMessageEmbed, 'setTitle');
    const webhookSend = jest.spyOn(fakeWebhookClient, 'send');

    await sendMergePullRequest.execute({ message, resource });

    expect(setTitle).toHaveBeenCalled();
    expect(webhookSend).toHaveBeenCalled();
  });

  it('should be able to send merge failed pull request message', async () => {
    const resource = {
      title: 'some-title',
      mergeStatus: 'failed',
    } as Resource;

    const { message } = {
      message: {
        markdown: 'some-message',
      },
      resource,
    } as PullRequestMerge;

    const setTitle = jest.spyOn(fakeMessageEmbed, 'setTitle');
    const webhookSend = jest.spyOn(fakeWebhookClient, 'send');

    await sendMergePullRequest.execute({ message, resource });

    expect(setTitle).toHaveBeenCalled();
    expect(webhookSend).toHaveBeenCalled();
  });
});
