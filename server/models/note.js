const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    name: {type: String},
    description: {type: String},
    board: {type: String},
    editor: {type: String},
    content: {type: String},
    time: {type: String}
});

mongoose.model('note', NoteSchema);