import { DiscordMessageEmbed } from '../../providers/MessageEmbed/implementations/DiscordMessageEmbed';
import { FakeWebhookClient } from '../../providers/WebhookClient/fakes/FakeWebhookClient';
import { IWebhookClient } from '../../providers/WebhookClient/models/IWebhookClient';
import { IMessageEmbed } from '../../providers/MessageEmbed/models/IMessageEmbed';

import { SendCreatePullRequestService } from './sendCreatePullRequestService';

import { AzurePullRequestCreateResource } from '../../types/Azure/PullRequestInterfaces/IPullRequest';

let fakeWebhookClient: IWebhookClient;
let fakeMessageEmbed: IMessageEmbed;

let sendCreatePullRequest: SendCreatePullRequestService;

describe('SendCreatePullRequestController', () => {
  beforeEach(() => {
    fakeWebhookClient = new FakeWebhookClient();
    fakeMessageEmbed = new DiscordMessageEmbed();

    sendCreatePullRequest = new SendCreatePullRequestService(
      fakeWebhookClient,
      fakeMessageEmbed,
    );
  });

  it('should be able to send create pull request message', async () => {
    const resource = {
      title: 'some-title',
      createdBy: {
        displayName: 'some-user',
        imageUrl: 'some-image-url',
        url: 'some-url',
      },
      reviewers: [
        {
          displayName: 'some-user',
          imageUrl: 'some-image-url',
          url: 'some-url',
        },
      ],
      _links: {
        web: {
          href: 'some-url',
        },
      },
      repository: {
        name: 'some-repository-name',
        url: 'some-repository-url',
      },
    } as AzurePullRequestCreateResource;

    const setTitleSpy = jest.spyOn(fakeMessageEmbed, 'setTitle');
    const webhookSend = jest.spyOn(fakeWebhookClient, 'send');

    await sendCreatePullRequest.execute(resource);

    expect(setTitleSpy).toHaveBeenCalled();
    expect(webhookSend).toHaveBeenCalled();
  });
});
