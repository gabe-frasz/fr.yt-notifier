import { html } from "hono/html";

export function Head(title?: string) {
	return html`
    <head>
      <meta charset="UTF-8" />
      <title>${title ?? "fr.yt-notifier | Dashboard"}</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <script src="https://unpkg.com/htmx.org@1.9.10"></script>
    </head>
  `;
}
