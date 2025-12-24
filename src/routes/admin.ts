import { Hono } from "hono";

import type { Env } from "../env";
import { TypedKV } from "../libs";
import { Dashboard } from "../views";
import { ChannelItem } from "../views/components";
import { extractInfoFromXML, websubSubscribe } from "../utils";
import { YOUTUBE_XML_BASE_URL } from "../consts";

export const admin = new Hono<{ Bindings: Env }>();

admin
	.get("/", async (c) => {
		const kv = new TypedKV(c.env.KV);
		const channels = await kv.listChannels();

		return c.html(Dashboard({ channels }));
	})
	.post("/subscriptions", async (c) => {
		const formData = await c.req.formData();
		const id = formData.get("id");

		if (!id || typeof id !== "string") return c.html("");

		const kv = new TypedKV(c.env.KV);

		const existingChannel = await kv.getChannel(id);
		if (existingChannel) return c.html("");

		const res = await fetch(YOUTUBE_XML_BASE_URL + id);
		if (!res.ok) return c.html("");

		const xml = await res.text();
		const info = extractInfoFromXML(xml);

		if (!info) return c.html("");

		await websubSubscribe(c.env, id);
		await kv.createChannel(id, { name: info.author, lastVideoId: null });

		return c.html(ChannelItem({ id, name: info.author }));
	})
  .delete("/subscriptions/:id", async (c) => {
    const id = c.req.param("id");

    const kv = new TypedKV(c.env.KV);
    await kv.deleteChannel(id);

    return c.html("");
  });
