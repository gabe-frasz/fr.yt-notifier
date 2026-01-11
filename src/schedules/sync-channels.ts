import pLimit from "p-limit";

import type { Env } from "../env";
import { TypedKV, YTHelper } from "../libs";
import { fetchChannelHandle } from "../utils";

const createLimit = pLimit(5);
const deleteLimit = pLimit(50);

export async function syncChannels(env: Env) {
	console.log("[syncChannels] Syncing ytSubscriptions");

	const kv = new TypedKV(env.KV);
	const yt = new YTHelper(
		{
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
			refreshToken: env.GOOGLE_REFRESH_TOKEN,
		},
		env.KV,
	);

	const [ytSubscriptions, kvChannels] = await Promise.all([
		yt.getAllSubscriptions(),
		kv.listChannels(),
	]);

	const ytSubscriptionsMap = new Map(ytSubscriptions.map((s) => [s.id, s]));
	const currentYtIds = new Set(ytSubscriptions.map((s) => s.id));
	const existingChannelIds = new Set(kvChannels.map((c) => c.id));

	const idsToCreate: Set<string> = currentYtIds.difference(existingChannelIds);
	const idsToDelete: Set<string> = existingChannelIds.difference(currentYtIds);

	const createPromises = Array.from(idsToCreate).map((id) =>
		createLimit(async () => {
			const channel = ytSubscriptionsMap.get(id)!;

			console.log(
				`[syncChannels] Syncing channel ${channel.name} (${channel.id})`,
			);

			await kv.createChannel(channel.id, {
				name: channel.name,
				handle: (await fetchChannelHandle(channel.id)) ?? undefined,
				lastVideoId: null,
			});

			console.log(`[syncChannels] Channel created`);
		}),
	);
	const deletePromises = Array.from(idsToDelete).map((id) =>
		deleteLimit(async () => {
			console.log(`[syncChannels] Deleting channel ${id}`);
			await kv.deleteChannel(id);
		}),
	);

	await Promise.all([...createPromises, ...deletePromises]);

	console.log("[syncChannels] Sync finished");
}
