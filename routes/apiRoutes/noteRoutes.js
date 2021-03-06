const router = require("express").Router();

const { validateNote, findById, createNote } = require("../../lib/notes");

const { notes } = require("../../db/db.json");

// get for db.json
router.get("/notes", (req, res) => {
  let results = notes;
  res.json(results);
});

//get for specific id
router.get("/notes/:id", (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

// posts changes to db and checks if response is valid
router.post("/notes", (req, res) => {
  // assigns req.body.id to length of database
  req.body.id = notes.length.toString();

  // checks if formatted properly
  if (!validateNote(req.body)) {
    res.status(400).send("The note is not properly formatted");
  } else {
    // creates new note with request body
    const note = createNote(req.body, notes);
    res.json(note);
  }
});

module.exports = router;
