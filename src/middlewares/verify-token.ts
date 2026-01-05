import { verify } from "hono/jwt";
import { getCookie } from "hono/cookie";

import { factory } from "../libs";

export const verifyToken = factory.createMiddleware(async (c, next) => {
  const token = getCookie(c, "auth_token");
  if (!token) return c.redirect("/admin/login");

  try {
    await verify(token, c.env.JWT_SECRET);
  } catch (e) {
    return c.redirect("/admin/login");
  }

  return next();
});
