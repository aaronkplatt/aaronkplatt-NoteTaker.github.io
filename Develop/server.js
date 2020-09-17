// // Express lets you interact witht the front end
// const express = require("express");
// // Filename path
// const path = require("path");

// // need fs to read and write to files
// const fs = require("fs");
// let db = require("./db/db.json")
// const shortid = require('shortid');

// // Creates an express server (if lost look at 08-StarWars-1)
// const app = express();

// //localhost:8080
// const PORT = 8080;

// // Sets up the Express app to handle data parsing
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
// // app.use(express.static("db"));

const express = require("express");
const path = require("path");
const moment = require("moment");
const fs = require("fs");

//set up Express App

const app = express();
let PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('db'));

// Routes
// =============================================================
// Basic route that sends the user first to the AJAX Page
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", function(req, res) {
    res.json(db);
  });

app.post("/api/notes", function (req, res) {
  var newNote = {
    id: shortid.generate(),
    title: req.body.title,
    text: req.body.text,
  };
  db.push(newNote);
  fs.writeFileSync(path.join (__dirname, "./db/db.json"), JSON.stringify(db));
  res.json(db);
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  