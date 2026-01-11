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
