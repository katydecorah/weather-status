#!/usr/bin/env node

const weather = require('../index.js');

weather.status({}, null, (err, callback) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(callback);
});
