const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
};
const bodyOptions = {
  describe: 'Body of note',
  demand: true,
  alias: 'b'
};

const argv = yargs
  .command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions
  })
  .command('list', 'List all notes')
  .command('read', 'Read a note', {
    title: titleOptions
  })
  .command('remove', 'Remove a note', {
    title: titleOptions
  })
  .help()
  .argv;
let command = argv._[0];

if (command === 'add') {
  let note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log(`Note created with title "${note.title}" and body: "${note.body}"`);
  } else {
    console.log(`A note with the title "${argv.title}" already exists`);
  }
} else if (command === 'list') {
  let allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s)`);
  for (let note of allNotes) {
    console.log(`"${note.title}" reads: "${note.body}"`);
  }
} else if (command === 'read') {
  let wantedNote = notes.getNote(argv.title);
  let message = wantedNote ? `The note "${argv.title}" reads: "${wantedNote}"` : 'Note not found';
  console.log(message);
} else if (command === 'remove') {
  let noteRemoved = notes.removeNote(argv.title);
  let message = noteRemoved ? `Note "${argv.title}" removed` : 'Note not found';
  console.log(message);
} else {
  console.log('Command not recognised');
}
