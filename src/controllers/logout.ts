import { deleteCookie } from "hono/cookie";

import { factory } from "../libs";

const handlers = factory.createHandlers(async (c) => {
	deleteCookie(c, "auth_token");
	return c.redirect("/admin/login");
});

export const logout = handlers[0];
