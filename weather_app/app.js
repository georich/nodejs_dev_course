const yargs = require('yargs');
const request = require('request');

const geocode = require('./geocode/geocode.js');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(JSON.stringify(results, undefined, 2));
  }
});

// 7aab4afb7ad387ca11385ced7b3c041e API key for dark sky

request({
  url: 'https://api.darksky.net/forecast/7aab4afb7ad387ca11385ced7b3c041e/52.9486597,-1.1737802',
  json: true
}, (error, response, body) => {
  if (!error && response.statusCode === 200) {
    console.log(`The current temperature is ${body.currently.temperature} Fahrenheit`);
  } else {
    console.log('Unable to fetch weather.');
  }
});
