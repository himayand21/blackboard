const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  name: { type: String },
  list: { type: String }
});

mongoose.model('card', CardSchema);