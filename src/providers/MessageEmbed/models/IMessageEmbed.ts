export interface IMessageEmbed {
  setTitle: (title: string) => IMessageEmbed;
  setDescription: (description: string) => IMessageEmbed;
  setColor: (color: string | number) => IMessageEmbed;
  setURL: (url: string) => IMessageEmbed;
  addField: (title: string, field: string | string[]) => IMessageEmbed;
  setAuthor: (
    name: string,
    imageUrl?: string | undefined,
    url?: string | undefined,
  ) => IMessageEmbed;
}
