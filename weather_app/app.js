const yargs = require('yargs');
// const request = require('request');

const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');

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
    // console.log(JSON.stringify(results, undefined, 2));
    console.log(results.address);
    weather.getWeather(results.latitude, results.longitude, (errorMessage, results) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        // console.log(JSON.stringify(results, undefined, 2));
        console.log(`The current temparure is ${results.temperature} Fahrenheit, it feels like ${results.apparentTemperature} Fahrenheit.`);
      }
    });
  }
});

// 7aab4afb7ad387ca11385ced7b3c041e API key for dark sky
/*
const latitude = 52.9486597;
const longitude = -1.1737802;
weather.getWeather(latitude, longitude, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(JSON.stringify(results, undefined, 2));
  }
});
*/
