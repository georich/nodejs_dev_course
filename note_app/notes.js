console.log('Starting notes.js');

const fs = require('fs');

let fetchNotes = () => {
  try {
    let notesString = fs.readFileSync('notes_data.json');
    return JSON.parse(notesString);
  } catch (error) {
    return [];
  }
};

let saveNotes = (notes) => {
  fs.writeFileSync('notes_data.json', JSON.stringify(notes));

};

let addNote = (title, body) => {
  // console.log('Adding note', title, body);
  let notes = fetchNotes();
  let note = {
    title,
    body,
  };
  let duplicateNotes = notes.filter((note) => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
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
