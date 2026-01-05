import { factory, TypedKV } from "../libs";

const handlers = factory.createHandlers(async (c) => {
	const id = c.req.param("id");
  if (!id) return c.html("");

	const kv = new TypedKV(c.env.KV);
	await kv.deleteChannel(id);

	return c.html("");
});

export const unsubscribe = handlers[0];
