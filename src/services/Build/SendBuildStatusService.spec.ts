import { DiscordMessageEmbed } from '../../providers/MessageEmbed/implementations/DiscordMessageEmbed';
import { IMessageEmbed } from '../../providers/MessageEmbed/models/IMessageEmbed';
import { FakeWebhookClient } from '../../providers/WebhookClient/fakes/FakeWebhookClient';
import { IWebhookClient } from '../../providers/WebhookClient/models/IWebhookClient';
import { AzureBuildResource } from '../../types/Azure/BuildInterfaces/IBuild';
import { Message } from '../../types/Azure/IAzure';
import { SendBuildStatusService } from './SendBuildStatusService';

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

    const resource: AzureBuildResource = {
      id: 0,
      buildNumber: 'some-build-number',
      status: 'succeeded',
      url: 'some-url',
    };

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

    const resource: AzureBuildResource = {
      id: 0,
      buildNumber: 'some-build-number',
      status: 'failed',
      url: 'some-url',
    };

    const setDescriptionSpy = jest.spyOn(fakeMessageEmbed, 'setDescription');
    const webhookSend = jest.spyOn(fakeWebhookClient, 'send');

    await sendBuildStatus.execute({ message, resource });

    expect(setDescriptionSpy).toHaveBeenCalledWith(message.markdown);
    expect(webhookSend).toHaveBeenCalled();
  });
});
