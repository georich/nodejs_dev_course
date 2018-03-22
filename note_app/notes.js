console.log('Starting notes.js');

const fs = require('fs');

let addNote = (title, body) => {
  // console.log('Adding note', title, body);
  let notes = [];
  let note = {
    title,
    body,
  };

  try {
    let notesString = fs.readFileSync('notes_data.json');
    notes = JSON.parse(notesString);
  } catch (error) {
    //
  }

  let duplicateNotes = notes.filter((note) => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push(note);
    fs.writeFileSync('notes_data.json', JSON.stringify(notes));
  }
};

let getAll = () => {
  console.log('Getting all notes');
};

let getNote = (title) => {
  console.log('Reading note', title)
};

let removeNote = (title) => {
  console.log('Removing note', title)
};

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
};
