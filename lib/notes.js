const fs = require("fs");
const path = require("path");

// creates a note based on passed in req.body & note db
function createNote(body, noteArray) {
  const note = body;
  noteArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify({ notes: noteArray }, null, 2)
  );
  return note;
}

// checks if title and text are strings
function validateNote(note) {
  if (!note.title || typeof note.title !== "string") {
    return false;
  }
  if (!note.text || typeof note.text !== "string") {
    return false;
  }
}

// finds by id
function findById(id, noteArray) {
  const result = noteArray.filter((note) => note.id === id)[0];
  return result;
}

module.exports = { validateNote, findById, createNote };
