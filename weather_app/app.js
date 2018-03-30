const request = require('request');

request({
  url: 'https://maps.googleapis.com/maps/api/geocode/json?address=1301+lombard+street+philadelphia&key=AIzaSyA9IOBTC9RCjuTR3QChNOVEu9Ri0yX3k4U',
  json: true
}, (error, response, body) => {
  console.log(body);
});
