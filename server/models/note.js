const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    name: {type: String},
    description: {type: String},
    board: {type: String},
    editor: {type: Object},
    owner: {type: String},
    time: {type: String}
});

mongoose.model('note', NoteSchema);