console.log('Starting app.js');

const fs = require('fs');
// const os = require('os');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const argv = yargs.argv;
let command = process.argv[2];
console.log(`Command: ${command}`);
// console.log('Process', process.argv);
console.log('Yargs', argv);

if (command === 'add') {
  // console.log('Adding new note');
  notes.addNote(argv.title, argv.body);
} else if (command === 'list') {
  // console.log('Listing all notes')
  notes.getAll();
} else if (command === 'read') {
  // console.log('Reading note');
  notes.getNote(argv.title);
} else if (command === 'remove') {
  // console.log('Removing note');
  notes.removeNote(argv.title);
} else {
  console.log('Commannd not recognised');
}

// console.log(_.isString(true));
// console.log(_.isString('George'));
// let filteredArray = _.uniq(['George', 1, 'George', 1, 2, 3, 4]);
// console.log(filteredArray);
// let setArray = new Set(['George', 1, 'George', 1, 2, 3, 4]);
// console.log(Array.from(setArray));

// let res = notes.addNote();
// console.log(res);

// console.log(notes.add(1, 3));

// let user = os.userInfo();

// fs.appendFile('greetings.txt', `Hello ${user.username.charAt(0).toUpperCase() + user.username.slice(1)}! You are ${notes.age}.`, (err) => {
//   if (err) {
//     console.log('Unable to write to file!');
//   }
// });
