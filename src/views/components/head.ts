import { html } from "hono/html";

export function Head(title?: string) {
	return html`
    <head>
      <meta charset="UTF-8" />
      <title>${title ?? "fr.yt-notifier | Dashboard"}</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <script src="https://unpkg.com/htmx.org@1.9.10"></script>
      <style>
        .htmx-indicator { opacity: 0; pointer-events: none; transition: opacity 0.2s ease-in; }
        .htmx-request .htmx-indicator { opacity: 1; pointer-events: auto; }
        .htmx-request.htmx-indicator { opacity: 1; pointer-events: auto; }
        .htmx-request .htmx-indicator-hide { opacity: 0; }
      </style>
    </head>
  `;
}
