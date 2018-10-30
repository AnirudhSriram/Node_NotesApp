console.log("Starting app.js");
//node modules
const yargs = require('yargs');
const _ = require('lodash');

//custom own modules

const notes = require('./notes.js');
let optionsList = {
    title: {

        describe: 'Title of the note',
        demand: true,
        alias: 't'
    },
    body:{
        describe: 'Contents of the note',
        demand: true,
        alias: 'b'
    }

}
const argv = yargs
    .command('add', 'Adds a new note', {
        title: optionsList.title, 
        body: optionsList.body
    })
    .command('list', 'Lists all the notes present')
    .command('read', 'Read the note with the provided title and displays to user', {
        title: optionsList.title
    })
    .command('remove','Removes the note with the given title' ,  {
        title : optionsList.title
    })
    .help()
    .argv;

let command = argv._[0];

let bracer = () => {
    console.log("-----------------------------------");
}
if (command) {
    console.log(`Command :${command}`);

    if (command === 'add') {
        let note = notes.addNote(argv.title, argv.body);
        bracer()
        if (!_.isUndefined(note)) {
            console.log(`${note.title} was added with ${note.body} as data`)
        } else {
            console.log(`Note with ${argv.title} as title already exists`);
        }
        bracer();
    } else if (command === 'list') {
        let list = notes.getAll();
        bracer();
        if (list.length) {
            console.log(`The list of notes are :\n ${list}`);
        } else {
            console.log(`There are no notes.`);
        }
        bracer();
    } else if (command === 'read') {
        let note = notes.getNote(argv.title);
        bracer();
        if (note) {
            console.log(`Content of ${argv.title} is : \n ${note.body}`);
        } else {
            console.log(`Note not found`);
        }
        bracer();
    } else if (command === 'remove') {
        let success = notes.removeNote(argv.title);
        bracer()
        if (success) {
            console.log(`Note with title ${argv.title} has been deleted`);
        } else {
            console.log(`Note with title ${argv.title} does not exist`);
        }
        bracer();
    } else {
        console.log("Command not found");
    }

}