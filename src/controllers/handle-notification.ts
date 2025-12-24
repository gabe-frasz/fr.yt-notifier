import { factory, TypedKV } from "../libs";
import { extractInfoFromXML, isDamnShort, sendMobileAlert } from "../utils";

const handlers = factory.createHandlers(async (c) => {
	const text = await c.req.text();

	const videoInfo = extractInfoFromXML(text);

	if (!videoInfo || (await isDamnShort(videoInfo.id))) return c.text("OK");

	const kv = new TypedKV(c.env.KV);

	let channel = await kv.getChannel(videoInfo.channelId);
	if (!channel) {
		channel = {
			id: videoInfo.channelId,
			name: videoInfo.author,
			lastVideoId: null,
		};

    await kv.createChannel(channel.id, channel);
	}

	if (channel.lastVideoId === videoInfo.id) return c.text("OK");

	await kv.updateChannelLastVideoId(channel.id, videoInfo.id);

	const saveUrl =
		c.req.header("host") + `/mobile-actions/save-video/${videoInfo.id}`;

	await sendMobileAlert({
		video: {
			id: videoInfo.id,
			title: videoInfo.title,
			link: videoInfo.link,
			author: videoInfo.author,
			saveUrl,
		},
		authToken: c.env.MOBILE_ACTIONS_SECRET,
		ntfyTopic: c.env.NTFY_TOPIC,
	});

	return c.text("OK");
});

export const handleNotification = handlers[0];
