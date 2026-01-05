import type { Env } from "../env";
import { TypedKV } from "../libs";
import { fetchLatestVideoFromChannel, sendMobileAlert } from "../utils";

export async function fetchLatestVideosFromRSS(env: Env) {
	const kv = new TypedKV(env.KV);

	const channels = await kv.listChannels();
	if (!channels.length) return;

	const videos = await Promise.all(
		channels.map((channel) => fetchLatestVideoFromChannel(env, channel.id)),
	);

	for (const video of videos) {
		if (!video) continue;

		const channel = await kv.getChannel(video.channelId);
		if (!channel || video.id === channel.lastVideoId) continue;

		await kv.updateChannelLastVideoId(video.channelId, video.id);
		await sendMobileAlert({
			video: {
				id: video.id,
				title: video.title,
				link: video.link,
				author: video.author,
				saveUrl: env.API_HOST + `/mobile-actions/save-video/${video.id}`,
			},
			authToken: env.MOBILE_ACTIONS_SECRET,
			ntfyTopic: env.NTFY_TOPIC,
		});
	}
}
