import { sign } from "hono/jwt";
import { setCookie, getCookie, deleteCookie } from "hono/cookie";

import { factory } from "../libs";
import { ONE_WEEK_IN_SECONDS } from "../consts";

const handlers = factory.createHandlers(async (c) => {
	const code = c.req.query("code");
	const state = c.req.query("state");
	const storedState = getCookie(c, "github_oauth_state");

	if (!code || !state || state !== storedState) {
		return c.text("Invalid state or code", 400);
	}

	deleteCookie(c, "github_oauth_state", { path: "/" });

	const tokenResponse = await fetch(
		"https://github.com/login/oauth/access_token",
		{
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				client_id: c.env.GITHUB_CLIENT_ID,
				client_secret: c.env.GITHUB_CLIENT_SECRET,
				redirect_uri: c.env.GITHUB_REDIRECT_URI,
				code,
			}),
		},
	);

	const tokenData = (await tokenResponse.json()) as any;

	if (tokenData.error) {
		return c.text(`GitHub Auth Failed: ${tokenData.error_description}`, 400);
	}

	const userResponse = await fetch("https://api.github.com/user", {
		headers: {
			Authorization: `Bearer ${tokenData.access_token}`,
			"User-Agent": "Cloudflare-Worker-Bot",
		},
	});

	const userData = (await userResponse.json()) as any;

	if (userData.login !== c.env.ALLOWED_USERNAME) {
		return c.text("Unauthorized: You are not the owner.", 403);
	}

	const sessionToken = await sign(
		{
			sub: userData.login,
			role: "admin",
			exp: Math.floor(Date.now() / 1000) + ONE_WEEK_IN_SECONDS,
		},
		c.env.JWT_SECRET,
	);

	setCookie(c, "auth_token", sessionToken, {
		httpOnly: true,
		secure: true,
		sameSite: "Lax",
		path: "/",
		maxAge: ONE_WEEK_IN_SECONDS,
	});

	return c.redirect("/admin");
});

export const handleGithubCallback = handlers[0];
