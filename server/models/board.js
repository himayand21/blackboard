const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
	name: { type: String },
	user: { type: String },
	color: { type: String }
});

mongoose.model('board', BoardSchema);