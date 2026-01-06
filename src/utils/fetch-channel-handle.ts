export async function fetchChannelHandle(channelId: string): Promise<string | null> {
  try {
    const res = await fetch(`https://www.youtube.com/channel/${channelId}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9"
      }
    });

    if (!res.ok) return null;

    const text = await res.text();
    const match = text.match(/"vanityChannelUrl":"http:\/\/www\.youtube\.com\/(@[^"]+)"/);
    
    return match ? match[1] : null;
  } catch (error) {
    console.error("Error fetching channel handle:", error);
    return null;
  }
}
