import type { Env } from "./env";
import { websubResubscribeToAll } from "./schedules";

const cronsMap: Record<string, (env: Env) => Promise<any>> = {
	"0 3 * * 2,6": websubResubscribeToAll,
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
