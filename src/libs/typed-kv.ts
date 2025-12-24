import type { ChannelKVData, ChannelKVInput } from "../typings";

export class TypedKV {
	constructor(private kv: KVNamespace) {}

	public async getChannel(channelId: string) {
		return await this.kv.get<ChannelKVData>(`channels:${channelId}`, "json");
	}

	public async createChannel(channelId: string, channel: ChannelKVInput) {
		const existingChannel = await this.getChannel(channelId);
		if (existingChannel) return;

		await this.kv.put(
			`channels:${channelId}`,
			JSON.stringify({
				...channel,
				id: channelId,
			}),
		);
	}

	public async updateChannelLastVideoId(
		channelId: string,
		lastVideoId: string,
	) {
		const existingChannel = await this.getChannel(channelId);
		if (!existingChannel) return;

		await this.kv.put(
			`channels:${channelId}`,
			JSON.stringify({
				...existingChannel,
				lastVideoId,
			}),
		);
	}

	public async listChannels() {
		const { keys } = await this.kv.list<ChannelKVData>({
			prefix: "channels:",
		});

		const promises = keys.map((key) => this.getChannel(key.name.split(":")[1]));
		const channels = await Promise.all(promises);

		return channels.filter((channel) => channel !== null);
	}

  public async deleteChannel(channelId: string) {
    const existingChannel = await this.getChannel(channelId);
    if (!existingChannel) return;

    await this.kv.delete(`channels:${channelId}`);
  }
}
