import { factory } from "../libs";

const handlers = factory.createHandlers((c) => {
	const challenge = c.req.query("hub.challenge");

	if (!challenge) {
		return c.text("Missing parameter: hub.challenge", 400);
	}

	return c.text(challenge);
});

export const websubHandshake = handlers[0];
