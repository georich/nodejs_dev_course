console.log('Starting app.js');

const fs = require('fs');
const os = require('os');
const notes = require('./notes.js')

let res = notes.addNote();
console.log(res);

console.log(notes.add(1, 3));

// let user = os.userInfo();

// fs.appendFile('greetings.txt', `Hello ${user.username.charAt(0).toUpperCase() + user.username.slice(1)}! You are ${notes.age}.`, (err) => {
//   if (err) {
//     console.log('Unable to write to file!');
//   }
// });
