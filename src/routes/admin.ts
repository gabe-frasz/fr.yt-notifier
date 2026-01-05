import { Hono } from "hono";

import type { Env } from "../env";
import {
	showLoginForm,
	showDashboard,
	subscribe,
	unsubscribe,
} from "../controllers";
import { redirectIfLoggedIn, verifyToken } from "../middlewares";

export const admin = new Hono<{ Bindings: Env }>();

admin
	.get("/login", redirectIfLoggedIn, showLoginForm)
	.get("/", verifyToken, showDashboard)
	.post("/subscriptions", verifyToken, subscribe)
	.delete("/subscriptions/:id", verifyToken, unsubscribe);
