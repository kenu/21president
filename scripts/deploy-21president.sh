#!/bin/zsh
. ~/.zshrc

cd ~/git/21president
git pull origin main
npm install
pm2 restart 21president --update-env
sleep 2
pm2 list

# Optional: Add Discord webhook notification if you have one
# curl -X POST -H 'Content-type: application/json' --data '{"content":"📦 21president Deploy Finished!\nhttp://your-site-url/"}' $WEBHOOK_DISCORD_URL
