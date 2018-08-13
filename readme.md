# Plex Event Handler
Utilising Plex Media Sever [Webhooks](https://support.plex.tv/articles/115002267687-webhooks/) Events

## Features: 
- Preventing users from pausing, by killing their stream with a warning message 
- Having multiple streams from the same account
- Ability to create more features based on other webhooks e.g. `pause`, `resume`, `stop`, `play`, `scrobble` and `rate`
- White list users from being effected by your rules
- Create or customise warning messages

### Requirements
- Plex Media Server (linux, windows, osx) 
- [X-Plex-Token](https://support.plex.tv/articles/204059436-finding-an-authentication-token-x-plex-token) is required! add to in `config` folder 
- Easier to run on the same machine PMS is on, but if you want to run a another machine update the `config` to reflect this
- Node 8 or above

### To use
- `npm install`
- `npm run dev` (runs nodemon for dev purposes)
- `npm run prod` 

### Ideas & Thoughts
- Integrate Telegram Bot to notify users
- Separate each media event into routes and add them to individual webhooks, should case Plex ever do this. 