import { html } from "hono/html";
import { factory, TypedKV } from "../libs";
import { ChannelItem } from "../views/components";
import { extractInfoFromXML, fetchChannelHandle } from "../utils";
import { YOUTUBE_XML_BASE_URL } from "../consts";

const handlers = factory.createHandlers(async (c) => {
	const formData = await c.req.formData();
	const id = formData.get("id");

	if (!id || typeof id !== "string") {
		return c.html("");
	}

	const kv = new TypedKV(c.env.KV);

	const existingChannel = await kv.getChannel(id);
	if (existingChannel) {
		return c.html("");
	}

	const res = await fetch(YOUTUBE_XML_BASE_URL + id);
	if (!res.ok) {
		return c.html("");
	}

	const info = extractInfoFromXML(await res.text());
	if (!info) {
		return c.html("");
	}

  const handle = await fetchChannelHandle(id);
	await kv.createChannel(id, { name: info.author, lastVideoId: null, handle: handle ?? undefined });

	return c.html(ChannelItem({ id, name: info.author, handle: handle ?? undefined }));
});

export const subscribe = handlers[0];
