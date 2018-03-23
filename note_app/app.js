console.log('Starting app.js');

const fs = require('fs');
// const os = require('os');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const argv = yargs.argv;
let command = argv._[0];
console.log(`Command: ${command}`);
console.log('Yargs', argv);

if (command === 'add') {
  let note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log(`Note created with title "${note.title}" and body: "${note.body}"`);
  } else {
    console.log(`A note with the title "${argv.title}" already exists`);
  }
} else if (command === 'list') {
  notes.getAll();
} else if (command === 'read') {
  notes.getNote(argv.title);
} else if (command === 'remove') {
  let noteRemoved = notes.removeNote(argv.title);
  let message = noteRemoved ? `Note "${argv.title}" removed` : 'Note not found';
  console.log(message);
} else {
  console.log('Commannd not recognised');
}
