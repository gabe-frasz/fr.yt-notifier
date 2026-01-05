import { factory, TypedKV } from "../libs";
import { Dashboard } from "../views";

const handlers = factory.createHandlers(async (c) => {
	const kv = new TypedKV(c.env.KV);
	const channels = await kv.listChannels();

	return c.html(Dashboard({ channels }));
});

export const showDashboard = handlers[0];
