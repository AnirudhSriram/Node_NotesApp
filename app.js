console.log("Starting app");

//node modules
const yargs = require('yargs');
//custom own modules
const _ = require('lodash');

const notes = require('./notes.js');
const argv = yargs.argv;
command = argv._[0];
console.log(command);
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