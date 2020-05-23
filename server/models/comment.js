const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    note: {type: String},
    sender: {type: String},
    content: {type: String},
    time: {type: String}
});

mongoose.model('comment', CommentSchema);