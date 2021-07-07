import { DiscordMessageEmbed } from '../providers/MessageEmbed/implementations/DiscordMessageEmbed';
import { FakeWebhookClient } from '../providers/WebhookClient/fakes/FakeWebhookClient';
import { IWebhookClient } from '../providers/WebhookClient/models/IWebhookClient';
import { IMessageEmbed } from '../providers/MessageEmbed/models/IMessageEmbed';

import { SendCommentPullRequestService } from './SendCommentPullRequestService';
import {
  PullRequestCommentedOn,
  Resource,
} from '../types/Azure/IPullRequestCommentedOn';

let fakeWebhookClient: IWebhookClient;
let fakeMessageEmbed: IMessageEmbed;

let sendCommentPullRequest: SendCommentPullRequestService;

describe('SendCommentPullRequestController', () => {
  beforeEach(() => {
    fakeWebhookClient = new FakeWebhookClient();
    fakeMessageEmbed = new DiscordMessageEmbed();

    sendCommentPullRequest = new SendCommentPullRequestService(
      fakeWebhookClient,
      fakeMessageEmbed,
    );
  });

  it('should be able to send comment pull request message', async () => {
    const resource = {
      comment: {
        content: 'some-content',
        author: {
          displayName: 'john doe',
          imageUrl: 'some-image-url',
          url: 'some-url',
        },
        _links: {
          self: {
            href: 'some-link',
          },
        },
      },
      pullRequest: {
        title: 'some-title',
      },
    } as Resource;

    const { message } = {
      message: {
        markdown: 'some-message',
      },
      resource,
    } as PullRequestCommentedOn;

    const setAuthor = jest.spyOn(fakeMessageEmbed, 'setAuthor');
    const webhookSend = jest.spyOn(fakeWebhookClient, 'send');

    await sendCommentPullRequest.execute({ message, resource });

    expect(setAuthor).toHaveBeenCalled();
    expect(webhookSend).toHaveBeenCalled();
  });
});
