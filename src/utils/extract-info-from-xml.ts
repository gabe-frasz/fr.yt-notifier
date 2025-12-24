export function extractInfoFromXML(xml: string) {
	const id = xml.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1];
	const title = xml.match(/<title>(.*?)<\/title>/)?.[1];
	const link = xml.match(/<link rel="alternate" href="(.*?)"/)?.[1];
	const author = xml.match(/<name>(.*?)<\/name>/)?.[1];
	const channelId = xml.match(/<yt:channelId>(.*?)<\/yt:channelId>/)?.[1];

  if (!id) return null;

	return {
		id,
		title: title ?? "New Video",
		link: link ?? "Unknown",
		author: author ?? "Unknown",
		channelId: channelId ?? "Unknown",
	};
}
