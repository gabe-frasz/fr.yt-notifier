import { html } from "hono/html";

import { Head, ChannelItem } from "./components";
import type { ChannelKVData } from "../typings";

export function Dashboard(props: { channels: ChannelKVData[] }) {
	return html`
    <!DOCTYPE html>
    <html class="dark" lang="en">
      ${Head()}

      <body class="bg-gray-900 text-gray-100 font-sans min-h-screen flex flex-col items-center p-8">
        <div class="w-full max-w-md">
          <h1 class="text-3xl font-bold mb-6 text-blue-400">fr.yt-notifier</h1>

          <form
            hx-post="/admin/subscriptions"
            hx-target="#channel-list"
            hx-swap="beforeend"
            class="flex gap-2 mb-6"
          >
            <input
              type="text"
              name="id"
              placeholder="Channel ID (UC...)"
              class="flex-1 bg-gray-800 border border-gray-700 rounded p-3 focus:outline-none focus:border-blue-500"
              required
            />
            <button
              type="submit"
              class="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded font-bold"
            >
              Add
            </button>
          </form>

          <ul class="space-y-3" id="channel-list">
            ${props.channels.map((channel) => ChannelItem({ id: channel.id, name: channel.name }))}
          </ul>
        </div>
      </body>
    </html>
  `;
}
