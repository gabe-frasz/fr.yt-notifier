export async function isDamnShort(videoId: string) {
	const res = await fetch(`https://www.youtube.com/shorts/${videoId}`, {
		method: "HEAD",
		redirect: "manual",
		headers: { "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1)" },
	});

	// if 200, it stayed on /shorts/<id>, so it's a short
	// if 3xx, it redirected to /watch, so it's a video
	return res.status < 300;
}

export async function saveVideoToYouTubePlaylist(
	videoId: string,
	playlistId: string,
	accessToken: string,
) {
	await fetch(
		`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet`,
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				snippet: {
					playlistId,
					resourceId: { kind: "youtube#video", videoId },
				},
			}),
		},
	);
}

export async function exchangeGoogleRefreshTokenForAccessToken(tokens: {
	clientId: string;
	clientSecret: string;
	refreshToken: string;
}) {
	const res = await fetch("https://oauth2.googleapis.com/token", {
		method: "POST",
		body: new URLSearchParams({
			client_id: tokens.clientId,
			client_secret: tokens.clientSecret,
			refresh_token: tokens.refreshToken,
			grant_type: "refresh_token",
		}),
	});

	return (await res.json()) as { access_token: string };
}
