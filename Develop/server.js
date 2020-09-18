const fs = require("fs");
const path = require("path");
const moment = require("moment");
const express = require("express");
const shortid = require('shortid');
const db = require("./db/db.json");

//set up Express App
const app = express();
let PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'db')));

// Routes
// =============================================================
// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });


// GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", function(req, res) {
  res.json(db);
});

//POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
app.post('/api/notes', function (req, res) {
  var newNote = {
    id: shortid.generate(),
    title: req.body.title,
    text: req.body.text,
  };
  //console
  console.log(newNote);

  db.push(newNote);
  fs.writeFileSync(path.join (__dirname, "./db/db.json"), JSON.stringify(db));
  res.json(db);
});

//DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
//console.log(db); WORKING ON !!!!!!

app.delete("/api/notes/:id", function(req, res) {
  db = db.filter((note) => note.id !== req.params.id);
  console.log(db);

  fs.writeFile(path.join (__dirname, "./db/db.json"), JSON.stringify(db), function (err) {
    if (err)throw err;
    res.sendStatus(200);
  });
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function(err) {
  if(err) {
    console.log(err);
  } else {
    console.log("Listening on: " + PORT);
  }
})
