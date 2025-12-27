import { YOUTUBE_XML_BASE_URL } from "../consts";
import type { Env } from "../env";

export async function websubSubscribe(env: Env, channelId: string) {
	await fetch("https://pubsubhubbub.appspot.com/subscribe", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({
			"hub.callback": `${env.API_HOST}/notifications`,
			"hub.topic": YOUTUBE_XML_BASE_URL + channelId,
			"hub.mode": "subscribe",
			// "hub.verify_token": "verify-token",
			// "hub.secret": env.WEBSUB_SECRET,
		}),
	});
}
