console.log('Starting app');

const fs = require('fs');
const os = require('os');

let user = os.userInfo();

fs.appendFile('greetings.txt', `Hello ${user.username.charAt(0).toUpperCase() + user.username.slice(1)}!`, (err) => {
  if (err) {
    console.log('Unable to write to file!');
  }
});
