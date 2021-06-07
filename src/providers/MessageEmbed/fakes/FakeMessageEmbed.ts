import { IMessageEmbed } from '../models/IMessageEmbed';

export class FakeMessageEmbed implements IMessageEmbed {
  public setDescription(description: string): IMessageEmbed {
    return new FakeMessageEmbed().setDescription(description);
  }

  public setColor(color: string | number): IMessageEmbed {
    return new FakeMessageEmbed().setColor(color);
  }
}
