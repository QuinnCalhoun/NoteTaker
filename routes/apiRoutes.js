var notesData = require("../db/db.json");
const fs = require(`fs`)
module.exports = function (app) {

  app.get("/api/notes", function (req, res) {
    readFileAsync("db/db.json", "utf8")
      .then(notes => res.json(notes))
      .catch(err => res.status(500).json(err))
  });


  app.post("/api/notes", function (req, res) {
    const { title, text } = req.body;

    if (!title || !text) {
      throw new Error("Note 'title' and 'text' cannot be blank");
    }

    // Add a unique id to the note using uuid package
    const newNote = { title, text, id: uuidv1() };

    // Get all notes, add the new note, write all the updated notes, return the newNote
    return this.getNotes()
      .then(notes => [...notes, newNote])
      .then(updatedNotes => this.write(updatedNotes))
      .then(() => newNote)
      .then((note) => res.json(note))
      .catch(err => res.status(500).json(err))
  });

  app.post("/api/clear", function (req, res) {
    tableData.length = 0;
    waitListData.length = 0;
    
    res.json({ ok: true });
  });
};
