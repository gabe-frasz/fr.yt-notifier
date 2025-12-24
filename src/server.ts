import { Hono } from "hono";
import { logger } from "hono/logger";

import type { Env } from "./env";
import { notifications, mobileActions, admin } from "./routes";

export const server = new Hono<{ Bindings: Env }>();

server.use(logger());
server.route("/notifications", notifications);
server.route("/mobile-actions", mobileActions);
server.route("/admin", admin);
