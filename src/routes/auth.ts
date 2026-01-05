import { Hono } from "hono";

import type { Env } from "../env";
import { handleGithubCallback, loginWithGithub, logout } from "../controllers";

export const auth = new Hono<{ Bindings: Env }>();

auth
	.get("/login/oauth/github", loginWithGithub)
	.get("/login/oauth/github/callback", handleGithubCallback)
	.get("/logout", logout);
