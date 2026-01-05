import { factory, TypedKV } from "../libs";
import { ChannelItem } from "../views/components";
import { extractInfoFromXML } from "../utils";
import { YOUTUBE_XML_BASE_URL } from "../consts";

const handlers = factory.createHandlers(async (c) => {
	const formData = await c.req.formData();
	const id = formData.get("id");

	if (!id || typeof id !== "string") return c.html("");

	const kv = new TypedKV(c.env.KV);

	const existingChannel = await kv.getChannel(id);
	if (existingChannel) return c.html("");

	const res = await fetch(YOUTUBE_XML_BASE_URL + id);
	if (!res.ok) return c.html("");

	const info = extractInfoFromXML(await res.text());
	if (!info) return c.html("");

	await kv.createChannel(id, { name: info.author, lastVideoId: null });

	return c.html(ChannelItem({ id, name: info.author }));
});

export const subscribe = handlers[0];
