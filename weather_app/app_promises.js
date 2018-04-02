const yargs = require('yargs');
const axios = require('axios');

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

let encodedAddress = encodeURIComponent(argv.address);
let geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyA9IOBTC9RCjuTR3QChNOVEu9Ri0yX3k4U`;

axios.get(geocodeURL).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address.');
  }

  let latitude = response.data.results[0].geometry.location.lat;
  let longitude = response.data.results[0].geometry.location.lng;
  let weatherURL = `https://api.darksky.net/forecast/7aab4afb7ad387ca11385ced7b3c041e/${latitude},${longitude}`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherURL);
}).then((response) => {
  let temperature = response.data.currently.temperature;
  let apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`The current temperature is ${temperature} Fahrenheit, it feels like ${apparentTemperature} Fahrenheit`);
}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to API servers.');
  } else {
    console.log(e.message);
  }
});
