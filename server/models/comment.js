const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	card: { type: String },
	sender: { type: String },
	content: { type: String }
});

mongoose.model('comment', CommentSchema);