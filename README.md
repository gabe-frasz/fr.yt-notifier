# yt-notifier

A simple notification service for YouTube channels WITH NO SHORTS via ntfy.sh

## TODO

- [X] Use KV to store subscriptions
- [X] Save last video ID in KV for each channel to avoid duplicates
- [X] ~~Add cron job to resub~~ Add cron job to check for new videos
- [X] Add frontend to manage subscriptions
	- [X] HTMX + Tailwind (CDN)
    - [X] Protect with JWT
- [X] Implement GitHub OAuth
- [X] Add mobile action to save video
    - [ ] Get Google/Youtube tokens
- [ ] Add cron job to refresh tokens
- [ ] Add cron job to refresh subscriptions list (once a day)
