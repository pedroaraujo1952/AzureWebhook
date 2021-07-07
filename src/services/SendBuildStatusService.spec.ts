import { DiscordMessageEmbed } from '../providers/MessageEmbed/implementations/DiscordMessageEmbed';
import { FakeWebhookClient } from '../providers/WebhookClient/fakes/FakeWebhookClient';
import { IWebhookClient } from '../providers/WebhookClient/models/IWebhookClient';
import { IMessageEmbed } from '../providers/MessageEmbed/models/IMessageEmbed';

import { SendBuildStatusService } from './SendBuildStatusService';
import { Message, Resource } from '../types/Azure/IBuildCompleted';

let fakeWebhookClient: IWebhookClient;
let fakeMessageEmbed: IMessageEmbed;

let sendBuildStatus: SendBuildStatusService;

describe('SendBuildStatusService', () => {
  beforeEach(() => {
    fakeWebhookClient = new FakeWebhookClient();
    fakeMessageEmbed = new DiscordMessageEmbed();

    sendBuildStatus = new SendBuildStatusService(
      fakeWebhookClient,
      fakeMessageEmbed,
    );
  });

  it('should send succeeded build message', async () => {
    const message: Message = {
      markdown: 'some-message',
    };

    const resource = {
      id: 0,
      buildNumber: 'some-build-number',
      status: 'succeeded',
      url: 'some-url',
    } as Resource;

    const setDescriptionSpy = jest.spyOn(fakeMessageEmbed, 'setDescription');
    const webhookSend = jest.spyOn(fakeWebhookClient, 'send');

    await sendBuildStatus.execute({ message, resource });

    expect(setDescriptionSpy).toHaveBeenCalledWith(message.markdown);
    expect(webhookSend).toHaveBeenCalled();
  });

  it('should send failed build message', async () => {
    const message: Message = {
      markdown: 'some-message',
    };

    const resource = {
      id: 0,
      buildNumber: 'some-build-number',
      status: 'failed',
      url: 'some-url',
    } as Resource;

    const setDescriptionSpy = jest.spyOn(fakeMessageEmbed, 'setDescription');
    const webhookSend = jest.spyOn(fakeWebhookClient, 'send');

    await sendBuildStatus.execute({ message, resource });

    expect(setDescriptionSpy).toHaveBeenCalledWith(message.markdown);
    expect(webhookSend).toHaveBeenCalled();
  });
});
