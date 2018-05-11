require('dotenv').config();
const request = require('request');

module.exports.status = (event, context, callback) => {
  module.exports
    .getWeather()
    .then(report => module.exports.processWeather(report))
    .then(profile => module.exports.updateSlackStatus(profile))
    .then(data => callback(null, data))
    .catch(err => callback(err));
};

module.exports.getWeather = () => {
  const opts = {
    url: `https://api.darksky.net/forecast/${process.env.DarkSkySecretKey}/${
      process.env.Lat
    },${process.env.Long}?exclude=hourly,daily`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return new Promise((resolve, reject) => {
    request(opts, (err, res, body) => {
      if (err) return reject(err);
      resolve(JSON.parse(body));
    });
  });
};

const getIcon = icon => {
  const icons = {
    'clear-day': ':sunny:',
    'clear-night': ':crescent_moon:',
    'partly-cloudy-day': ':partly_sunny:',
    'partly-cloudy-night': ':partly_sunny:',
    cloudy: ':cloud:',
    rain: ':rain_cloud:',
    sleet: ':snow_cloud:',
    snow: ':snowflake:',
    wind: ':wind_blowing_face:',
    fog: ':fog:'
  };
  return icons[icon] ? icons[icon] : ':question:';
};

const getMessage = report => {
  let units = report.flags.units == 'us' ? '℉' : '℃';
  let message = `${report.minutely.summary} ${Math.round(
    report.currently.temperature
  )}${units}`;

  // let us know if actual temperature differs from apparent temperature
  if (
    Math.round(report.currently.apparentTemperature) !==
    Math.round(report.currently.temperature)
  ) {
    message += ` (feels like ${Math.round(
      report.currently.apparentTemperature
    )}${units})`;
  }
  return message;
};

module.exports.processWeather = report => {
  return new Promise(resolve => {
    resolve({
      status_emoji: getIcon(report.minutely.icon),
      status_text: getMessage(report)
    });
  });
};

module.exports.updateSlackStatus = profile => {
  const opts = {
    url: `https://slack.com/api/users.profile.set?token=${
      process.env.SlackAccessToken
    }&profile=${encodeURIComponent(JSON.stringify(profile))}&user=${
      process.env.SlackUser
    }`
  };
  return new Promise((resolve, reject) => {
    request.post(opts, (err, res, body) => {
      if (err) return reject(`The Slack API returned an error: ${err}`);
      if (!JSON.parse(body).ok)
        return reject(`${body} from updateSlackStatus()`);
      resolve(`Weather updated!`);
    });
  });
};
