import { factory } from "../libs";
import { LoginForm } from "../views";

const handlers = factory.createHandlers(async (c) => {
	return c.html(LoginForm());
});

export const showLoginForm = handlers[0];
