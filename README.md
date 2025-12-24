# yt-notifier

A simple notification service for YouTube channels WITH NO SHORTS via ntfy.sh

## TODO

- [X] Use KV to store subscriptions
- [X] Save last video ID in KV for each channel to avoid duplicates
- [X] Add cron job to resub
- [X] Add frontend to manage subscriptions
	- [X] HTMX + Tailwind (CDN)
    - [ ] Protect with JWT
- [ ] Implement GitHub OAuth
- [X] Add mobile action to save video
    - [ ] Get Google/Youtube tokens
- [ ] Subscribe with secret and validate every feed notification
