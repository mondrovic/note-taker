const express = require("express");
const { db } = require("./db/db.json");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming string or array
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

// finds by id
function findById(id, noteArray) {
  const result = noteArray.filter((note) => note.id === id)[0];
  return result;
}

// get for db.json
app.get("/api/notes", (req, res) => {
  let results = db;
  res.json(results);
});

//get for specific id
app.get("/api/notes/:id", (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

// add spot for index.html and notes.html

// posts changes to db and checks if response is valid
app.post("/api/notes", (req, res) => {
  // parses request id to string
  req.body.id = notes.length.toString();

  // checks if formatted properly
  if (!validateNote(req.body)) {
    res.status(400).send("The note is not properly formatted");
  } else {
    // creates new note with request body
    const note = createNote(req.body, db);
    res.json(note);
  }
});

// creates a note based on passed in req.body & note db
function createNote(body, noteArray) {
  const note = body;
  noteArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
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

// adds port to listen on
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
