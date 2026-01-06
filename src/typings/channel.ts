export type ChannelKVData = {
	id: string;
  name: string;
  handle?: string;
	lastVideoId: string | null;
};

export type ChannelKVInput = Omit<ChannelKVData, "id">;
