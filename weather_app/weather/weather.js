const request = require('request');

let getWeather = (latitude, longitude, callback) => {
  request({
    url: `https://api.darksky.net/forecast/7aab4afb7ad387ca11385ced7b3c041e/${latitude},${longitude}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    } else {
      callback('Unable to fetch weather.');
    }
  });
};

module.exports = {
  getWeather
}
