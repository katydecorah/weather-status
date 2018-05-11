# 🌞 weather-status

![Screenshot of Slack workspace where a user's status displays the current weather forecast.](example.png)

Make your Slack status the weather forecast.

## Set up

Rename `.sample-env` to `.env`. In that file, add values for each parameter:

- `DarkSkySecretKey` - Create a [Dark Sky account](https://darksky.net/dev/) to retrieve a secret key.
- `SlackAccessToken` - Create a [new app](https://api.slack.com/apps) to get an OAuth Access Token.
- `SlackUser` - Your Slack `user`, can be retrieved through [users.list tester](https://api.slack.com/methods/users.list/test).
- `Lat` - The latitude of the location where you want the weather forecast.
- `Lon` - The longitude of the location where you want the weather forecast.

## Run it

```
npm install
node bin/weather-status.js
```
