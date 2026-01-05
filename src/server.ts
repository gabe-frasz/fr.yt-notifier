import { Hono } from "hono";
import { logger } from "hono/logger";

import type { Env } from "./env";
import { auth, mobileActions, admin } from "./routes";

export const server = new Hono<{ Bindings: Env }>();

server
	.use(logger())
  .route("/auth", auth)
	.route("/mobile-actions", mobileActions)
	.route("/admin", admin);
