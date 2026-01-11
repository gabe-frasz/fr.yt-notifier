import { GOOGLE_EXPIRATION_TTL } from "../consts";

interface YTHelperProps {
	clientId: string;
	clientSecret: string;
	refreshToken: string;
}

export class YTHelper {
	private readonly baseUrl = "https://www.googleapis.com/youtube/v3/";
	private readonly authUrl = "https://oauth2.googleapis.com/token";

	constructor(
		private readonly props: YTHelperProps,
		private readonly kv: KVNamespace,
	) {}

	public async getAllSubscriptions() {
		let accessToken = await this.kv.get<string>("yt-access-token");
		if (!accessToken) {
			const { access_token } = await this.getAccessToken();
			accessToken = access_token;
			await this.kv.put("yt-access-token", accessToken, {
				expirationTtl: GOOGLE_EXPIRATION_TTL,
			});
		}

		let channels: { id: string; name: string }[] = [];
		let nextPageToken = "";

		do {
			const url = new URL(this.baseUrl + "subscriptions");
			url.searchParams.append("part", "snippet");
			url.searchParams.append("mine", "true");
			url.searchParams.append("maxResults", "50");
			if (nextPageToken) url.searchParams.append("pageToken", nextPageToken);

			const res = await fetch(url.toString(), {
				headers: { Authorization: `Bearer ${accessToken}` },
			});

			if (!res.ok) {
				console.error("Erro ao buscar subs:", await res.text());
				break;
			}

			const data = (await res.json()) as any;

			const infos = data.items.map((item: any) => ({
				id: item.snippet.resourceId.channelId,
				name: item.snippet.title,
			}));
			channels.push(...infos);

			nextPageToken = data.nextPageToken;
		} while (nextPageToken);

		return channels;
	}

	private async getAccessToken() {
		const res = await fetch(this.authUrl, {
			method: "POST",
			body: new URLSearchParams({
				client_id: this.props.clientId,
				client_secret: this.props.clientSecret,
				refresh_token: this.props.refreshToken,
				grant_type: "refresh_token",
			}),
		});

		return (await res.json()) as { access_token: string };
	}
}
