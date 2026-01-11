import type { Env } from "./env";
import { fetchLatestVideosFromRSS, syncChannels } from "./schedules";

const cronsMap: Record<string, (env: Env) => Promise<any>> = {
	"*/20 * * * *": fetchLatestVideosFromRSS,
  "0 0 * * *": syncChannels,
};

export async function scheduler(
	controller: ScheduledController,
	env: Env,
	ctx: ExecutionContext,
) {
	const cronHandler = cronsMap[controller.cron];
	if (!cronHandler)
		return console.warn(`No cron handler for ${controller.cron}`);

	ctx.waitUntil(await cronHandler(env));
}
