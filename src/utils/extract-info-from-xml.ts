const regexes = {
  videoId: /<yt:videoId>(.*?)<\/yt:videoId>/,
  title: /<title>(.*?)<\/title>/g,
  link: /<link rel="alternate" href="(.*?)"/,
  author: /<name>(.*?)<\/name>/,
  channelId: /<yt:channelId>(.*?)<\/yt:channelId>/,
};

export function extractInfoFromXML(xml: string) {
	const id = xml.match(regexes.videoId)?.[1];
  if (!id) return null;

  const title = Array.from(xml.matchAll(regexes.title))[1][1] ?? "New video";
	const link = xml.match(regexes.link)?.[1] ?? "Unknown";
	const author = xml.match(regexes.author)?.[1] ?? "Unknown";
  const channelId = xml.match(regexes.channelId)?.[1] ?? "Unknown";

	return {
		id,
    title,
		link,
		author,
		channelId: channelId.startsWith("UC") ? channelId : `UC${channelId}`,
	};
}
