import { verify } from "hono/jwt";
import { getCookie } from "hono/cookie";

import { factory } from "../libs";

export const redirectIfLoggedIn = factory.createMiddleware(async (c, next) => {
	const token = getCookie(c, "auth_token");
  if (!token) return next();

  try {
    await verify(token, c.env.JWT_SECRET);
  } catch (e) {
    return next();
  }

	return c.redirect("/admin");
});
