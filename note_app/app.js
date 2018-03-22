console.log('Starting app.js');

const fs = require('fs');
const os = require('os');
const _ = require('lodash');
const notes = require('./notes.js');

console.log(_.isString(true));
console.log(_.isString('George'));
let filteredArray = _.uniq(['George', 1, 'George', 1, 2, 3, 4]);
console.log(filteredArray);
let setArray = new Set(['George', 1, 'George', 1, 2, 3, 4]);
console.log(Array.from(setArray));

// let res = notes.addNote();
// console.log(res);

// console.log(notes.add(1, 3));

// let user = os.userInfo();

// fs.appendFile('greetings.txt', `Hello ${user.username.charAt(0).toUpperCase() + user.username.slice(1)}! You are ${notes.age}.`, (err) => {
//   if (err) {
//     console.log('Unable to write to file!');
//   }
// });
