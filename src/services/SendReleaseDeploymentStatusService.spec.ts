/* eslint-disable @typescript-eslint/no-explicit-any */
import { DiscordMessageEmbed } from '../providers/MessageEmbed/implementations/DiscordMessageEmbed';
import { FakeWebhookClient } from '../providers/WebhookClient/fakes/FakeWebhookClient';
import { IWebhookClient } from '../providers/WebhookClient/models/IWebhookClient';
import { IMessageEmbed } from '../providers/MessageEmbed/models/IMessageEmbed';

import { SendReleaseDeploymentStatusService } from './SendReleaseDeploymentStatusService';
import { Message, Resource } from '../types/Azure/IReleaseDeploymentComplete';

let fakeWebhookClient: IWebhookClient;
let fakeMessageEmbed: IMessageEmbed;

let sendReleaseBuildStatus: SendReleaseDeploymentStatusService;

describe('SendReleaseDeploymentStatusService', () => {
  beforeEach(() => {
    fakeWebhookClient = new FakeWebhookClient();
    fakeMessageEmbed = new DiscordMessageEmbed();

    sendReleaseBuildStatus = new SendReleaseDeploymentStatusService(
      fakeWebhookClient,
      fakeMessageEmbed,
    );
  });

  it('should send succeeded build message', async () => {
    const message: Message = {
      markdown: 'some-message',
    };

    const resource = {
      environment: {
        name: 'some-env-name',
        status: 'succeeded',
      },
    } as Resource;

    const setDescriptionSpy = jest.spyOn(fakeMessageEmbed, 'setDescription');
    const webhookSend = jest.spyOn(fakeWebhookClient, 'send');

    const getURL = jest
      // @ts-expect-error Jest use case
      .spyOn<any>(sendReleaseBuildStatus, 'getURL')
      .mockImplementationOnce(() => 'some-url');

    await sendReleaseBuildStatus.execute({ message, resource });

    expect(setDescriptionSpy).toHaveBeenCalledWith(message.markdown);
    expect(webhookSend).toHaveBeenCalled();
    expect(getURL).toHaveBeenCalled();
  });

  it('should send failed build message', async () => {
    const message: Message = {
      markdown: 'some-message',
    };

    const resource = {
      environment: {
        name: 'some-env-name',
        status: 'failed',
      },
    } as Resource;

    const setDescriptionSpy = jest.spyOn(fakeMessageEmbed, 'setDescription');
    const webhookSend = jest.spyOn(fakeWebhookClient, 'send');

    const getURL = jest
      // @ts-expect-error Jest use case
      .spyOn<any>(sendReleaseBuildStatus, 'getURL')
      .mockImplementationOnce(() => 'some-url');

    await sendReleaseBuildStatus.execute({ message, resource });

    expect(setDescriptionSpy).toHaveBeenCalledWith(message.markdown);
    expect(webhookSend).toHaveBeenCalled();
    expect(getURL).toHaveBeenCalled();
  });
});
