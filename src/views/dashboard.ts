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
          <div class="flex justify-between items-center mb-6">
            <h1 class="text-3xl font-bold text-blue-400">fr.yt-notifier</h1>
            <a href="/auth/logout" class="text-sm text-gray-400 hover:text-white transition-colors">
              Logout
            </a>
          </div>

          <form
            hx-post="/admin/subscriptions"
            hx-target="#channel-list"
            hx-swap="beforeend"
            hx-on::after-request="if(event.detail.successful) document.getElementById('no-channels')?.remove()"
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
              class="relative bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed py-2 rounded font-bold flex items-center justify-center w-24"
              hx-disabled-elt="this"
            >
              <span class="htmx-indicator-hide">Add</span>
              <div class="htmx-indicator absolute inset-0 flex items-center justify-center">
                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            </button>
          </form>

          <ul class="space-y-3" id="channel-list">
            ${props.channels.length === 0
							? html`
                  <li id="no-channels" class="text-gray-500 text-center py-10 bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-700">
                    <p class="text-lg font-medium">No channels yet</p>
                    <p class="text-sm">Enter a YouTube Channel ID to get started.</p>
                  </li>
                `
							: props.channels.map((channel) => ChannelItem({ id: channel.id, name: channel.name, handle: channel.handle }))}
          </ul>
        </div>
      </body>
    </html>
  `;
}
