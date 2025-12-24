import { Hono } from "hono";

import type { Env } from "../env";
import { websubHandshake, handleNotification } from "../controllers";
// import { verifyWebsubHmac } from "../middlewares";

export const notifications = new Hono<{ Bindings: Env }>();

notifications.get("/", websubHandshake).post("/", handleNotification);
