import { html } from "hono/html";

export function ChannelItem(props: { id: string, name: string }) {
  return html`
    <li class="bg-gray-800 p-4 rounded flex justify-between items-center border border-gray-700">
      <span class="font-mono text-sm text-gray-300">${props.name}</span>

      <button
        hx-delete="/admin/subscriptions/${props.id}"
        hx-target="closest li"
        hx-swap="outerHTML"
        class="text-red-400 hover:text-red-300 text-sm font-semibold cursor-pointer"
      >
        Remove
      </button>
    </li>
  `;
}
