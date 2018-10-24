console.log("starting notes.js");
const fs = require('fs');
let fetchNotes = () => {
    try {
        let availableData = fs.readFileSync(`JSON-DATA.json`);
        return JSON.parse(availableData);
    } catch (e) {
        return [];
    }
};
let saveNotes = (notes) => {
    fs.writeFileSync(`JSON-DATA.json`, JSON.stringify(notes));
}
let addNote = function (title, body) {
    var notes = fetchNotes();
    let note = {
        title, body
    };

    let duplicateNotes = notes.filter((note) => note.title === title);
    if (!duplicateNotes.length) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }


}

let getAll = function () {
    let notes = fetchNotes();
    let noteList = [];
    notes.forEach(note => {
        noteList.push(note.title);
    });
    return noteList;
}
let getNote = function (title) {
    let notes = fetchNotes();
    let NoteToBeFetched = notes.filter((note) => note.title == title);
    return NoteToBeFetched[0];
}

let removeNote = function (title) {
    let notes = fetchNotes();
    let filteredNotes = notes.filter((note) => note.title !== title);
    saveNotes(filteredNotes);
    if (filteredNotes.length == notes.length) {
        return false;
    } else {
        return true;
    }
}



module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote
}
