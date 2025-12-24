import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";

import type { Env } from "../env";
import { saveVideo } from "../controllers";

export const mobileActions = new Hono<{ Bindings: Env }>();

mobileActions.post(
	"/save-video/:id",
	bearerAuth({
		verifyToken(token, c) {
			return token === c.env.MOBILE_ACTIONS_SECRET;
		},
	}),
	saveVideo,
);
