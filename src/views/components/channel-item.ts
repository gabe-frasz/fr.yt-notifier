import { html } from "hono/html";

export function ChannelItem(props: { id: string, name: string, handle?: string }) {
  const avatarUrl = props.handle 
    ? `https://unavatar.io/youtube/${props.handle.replace("@", "")}` 
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(props.name)}&background=random&color=fff`;

  return html`
    <li class="bg-gray-800 p-4 rounded flex justify-between items-center border border-gray-700">
      <div class="flex items-center gap-3">
        <img 
          src="${avatarUrl}" 
          alt="${props.name}" 
          class="w-10 h-10 rounded-full bg-gray-700"
          loading="lazy"
        />
        <div class="flex flex-col">
          <span class="font-medium text-gray-200">${props.name}</span>
          ${props.handle ? html`<span class="text-xs text-gray-500">${props.handle}</span>` : ""}
        </div>
      </div>

      <button
        hx-delete="/admin/subscriptions/${props.id}"
        hx-confirm="Are you sure you want to unsubscribe from ${props.name}?"
        hx-target="closest li"
        hx-swap="outerHTML"
        class="text-red-400 hover:text-red-300 text-sm font-semibold cursor-pointer"
      >
        Remove
      </button>
    </li>
  `;
}
