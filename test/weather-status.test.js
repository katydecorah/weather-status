const test = require('tape');
const weather = require('../index.js');
let clear = require('./fixtures/clear.json');
let rain = require('./fixtures/rain.json');
let snow = require('./fixtures/snow.json');
let si = require('./fixtures/si.json');

// TODO:  status
// TODO:  getWeather
// TODO:  updateSlackStatus

// processWeather
test('[processWeather] clear', assert => {
  return weather.processWeather(clear).then(d => {
    assert.deepEqual(d, {
      status_emoji: ':sunny:',
      status_text: 'Clear for the hour. 51℉'
    });
    assert.end();
  });
});

test('[processWeather] rain', assert => {
  return weather.processWeather(rain).then(d => {
    assert.deepEqual(d, {
      status_emoji: ':rain_cloud:',
      status_text:
        'Light rain stopping in 13 min., starting again 30 min. later. 66℉'
    });
    assert.end();
  });
});

test('[processWeather] snow', assert => {
  return weather.processWeather(snow).then(d => {
    assert.deepEqual(d, {
      status_emoji: ':snowflake:',
      status_text: 'Light snow for the hour. 27℉ (feels like 16℉)'
    });
    assert.end();
  });
});

test('[processWeather] si', assert => {
  return weather.processWeather(si).then(d => {
    assert.deepEqual(d, {
      status_emoji: ':sunny:',
      status_text: 'Clear for the hour. 51℃'
    });
    assert.end();
  });
});
