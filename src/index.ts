import { server } from "./server";
import { scheduler } from "./scheduler";
import type { Env } from "./env";

export default {
  fetch: server.fetch,
  scheduled: scheduler,
} satisfies ExportedHandler<Env>;
