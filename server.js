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

// get for db.json
app.get("/api/notes", (req, res) => {
  let results = db;

  res.json(results);
});

// get for index.html
// app.get("/notes", (req, res) => {
//   console.log(req, res);
// });

// adds port to listen on
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
