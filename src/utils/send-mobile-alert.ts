interface SendMobileAlertOptions {
  video: {
		id: string;
		title: string;
		link: string;
		author: string;
		saveUrl: string;
	};
  authToken: string;
  ntfyTopic: string;
}

export async function sendMobileAlert(options: SendMobileAlertOptions) {
  const { video, authToken, ntfyTopic } = options;

	await fetch(`https://ntfy.sh/`, {
		method: "POST",
		body: JSON.stringify({
			topic: ntfyTopic,
			title: video.author,
			message: video.title,
			click: `https://www.youtube.com/watch?v=${video.id}`,
			actions: [
				{
					action: "http",
					label: "➕ Save to Playlist",
					url: video.saveUrl,
					method: "POST",
					headers: {
						Authorization: `Bearer ${authToken}`,
					},
					clear: true,
				},
			],
		}),
	});
}
