const fs = require("fs");
const { findById, createNote, validateNote } = require("../lib/notes");
const { notes } = require("../db/db.json");
const { validate } = require("@babel/types");
jest.mock("fs");

// createNote function with note title:text
test("creates a note object", () => {
  const note = createNote({ title: "Test", text: "Test" }, notes);

  expect(note.title).toBe("Test");
  expect(note.text).toBe("Test");
});

// finds note by id
test("Finds by ID", () => {
  const startingNote = [
    {
      id: "1",
      title: "Test1",
      text: "Test1",
    },
    {
      id: "2",
      title: "Test2",
      text: "Test2",
    },
  ];
  // uses ID 3 and starting animals array to try and find Erica
  const result = findById("2", startingNote);
  expect(result.title).toBe("Test2");
});

test("validates formatting", () => {
  const validNote = {
    id: "1",
    title: "Test1",
    text: "Test1",
  };

  const invalidNote = {
    id: "1",
    title: "Test1",
  };

  const result = validateNote(validNote);
  const result2 = validateNote(invalidNote);

  expect(result).toBe(true);
  expect(result2).toBe(false);
});
