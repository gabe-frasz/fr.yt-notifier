import { setCookie } from "hono/cookie";
import { factory } from "../libs";

const handlers = factory.createHandlers(async (c) => {
	const state = crypto.randomUUID();

	setCookie(c, "github_oauth_state", state, {
		httpOnly: true,
		secure: true,
		sameSite: "Lax",
		path: "/",
		maxAge: 600, // 10 minutes
	});

	const params = new URLSearchParams({
		client_id: c.env.GITHUB_CLIENT_ID,
		redirect_uri: c.env.GITHUB_REDIRECT_URI,
		scope: "read:user",
		state,
	});

	return c.redirect(`https://github.com/login/oauth/authorize?${params}`);
});

export const loginWithGithub = handlers[0];
