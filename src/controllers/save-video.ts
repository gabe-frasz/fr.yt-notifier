import { factory } from "../libs";
// import { saveVideoToYouTubePlaylist } from "../utils";

const handlers = factory.createHandlers(async (c) => {
	const id = c.req.param("id");

	if (!id) return c.status(400);

	// await saveVideoToYouTubePlaylist(id, c.env.YOUTUBE_PLAYLIST_ID, "");

	return c.status(200);
});

export const saveVideo = handlers[0];
