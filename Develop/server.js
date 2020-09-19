const fs = require("fs");
const path = require("path");
const moment = require("moment");
const express = require("express");
const shortid = require('shortid');
//DB IS THE JSON FILE.
const db = require("./db/db.json");
const { relativeTimeRounding } = require("moment");
const { request } = require("http");

//set up Express App
const app = express();
let PORT = process.env.PORT || 8080;

//express stuff
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
//Set ID for post to 0 because each new one is going to be added by 1
var id = 0;
app.post('/api/notes', function (req, res) {
  req.body.id = ++ id;
  //This posts the data to the html
  db.push(req.body);
  res.json(req.body);
  console.log("THESE ARE THE NOTES ----------------------------")
  console.log(req.body);
});

//DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
app.delete('/api/notes/:id', function (req, res) {
  //line below gets you the ID
  var requestId = req.params.id
  //line below finds the object from the array you are clicking
  let index = db.findIndex((data) => data.id == requestId);
  //remove that object from the array based off the index determined above
  db.splice(index, 1);
  //not sure why we need this, but the script doesn't work without it
  res.json({ ok: true });
  res.send("DELETE Request Called")
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
