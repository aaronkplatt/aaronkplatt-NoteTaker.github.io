// Express lets you interact witht the front end
const express = require("express");

// Filename path
const path = require("path");

// need fs to read and write to files
const fs = require("fs");
// let db = require("./db/db.json")
// const shortid = require('shortid');

// Creates an express server (if lost look at 08-StarWars-1)
const app = express();

//localhost:3000
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// =============================================================
// Basic route that sends the user first to the AJAX Page
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });





// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  