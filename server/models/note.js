const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    name: {type: String},
    description: {type: String},
    board: {type: String},
    editor: {type: Object},
    owner: {type: String},
    time: {type: String},
    pinned: {type: Boolean},
    sharedWithEveryone: {type: Boolean},
    sharedWith: {type: Array}
});

mongoose.model('note', NoteSchema);