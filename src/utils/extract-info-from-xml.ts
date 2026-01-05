const regexes = {
  entry: /<entry>([\s\S]*?)<\/entry>/,
  videoId: /<yt:videoId>(.*?)<\/yt:videoId>/,
  title: /<title>(.*?)<\/title>/,
  link: /<link rel="alternate" href="(.*?)"/,
  author: /<name>(.*?)<\/name>/,
  channelId: /<yt:channelId>(.*?)<\/yt:channelId>/,
};

export function extractInfoFromXML(xml: string) {
  const latestEntry = xml.match(regexes.entry)?.[1];
  if (!latestEntry) return null;

	const id = latestEntry.match(regexes.videoId)?.[1];
  if (!id) return null;

  const title = latestEntry.match(regexes.title)?.[1] ?? "New video";
	const link = latestEntry.match(regexes.link)?.[1] ?? "Unknown";
	const author = latestEntry.match(regexes.author)?.[1] ?? "Unknown";
  const channelId = latestEntry.match(regexes.channelId)?.[1] ?? "Unknown";

	return {
		id,
    title,
		link,
		author,
		channelId: channelId.startsWith("UC") ? channelId : `UC${channelId}`,
	};
}
