import { YOUTUBE_XML_BASE_URL } from "../consts";
import type { Env } from "../env";
import { extractInfoFromXML } from "../utils";

export async function fetchLatestVideoFromChannel(_: Env, channelId: string) {
  const res = await fetch(YOUTUBE_XML_BASE_URL + channelId);
  const xml = await res.text();

  return extractInfoFromXML(xml);
}
