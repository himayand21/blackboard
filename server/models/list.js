const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  name: { type: String },
  board: { type: String }
});

mongoose.model('list', ListSchema);