import type { Env } from "../env";
import { TypedKV } from "../libs";
import { websubSubscribe } from "../utils";

export async function websubResubscribeToAll(env: Env) {
	const kv = new TypedKV(env.KV);

	const channels = await kv.listChannels();
	if (!channels.length) return;

	await Promise.all(
		channels.map((channel) => websubSubscribe(env, channel.id)),
	);
}
