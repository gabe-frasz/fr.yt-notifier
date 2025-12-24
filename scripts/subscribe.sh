#!/bin/env bash

if [ -z "$1" ]; then
  echo "Usage: $0 <channel_id>"
  exit 1
fi

curl -X POST https://pubsubhubbub.appspot.com/subscribe \
  -d "hub.callback=https://yt-notifier.gabrielvitor-frasao.workers.dev/notifications" \
  -d "hub.topic=https://www.youtube.com/feeds/videos.xml?channel_id=$1" \
  -d "hub.mode=subscribe"
