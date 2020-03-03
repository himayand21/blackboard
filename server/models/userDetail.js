const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserDetailSchema = new Schema({
  name: { type: String },
  _id: { type: Schema.Types.ObjectId }
});

mongoose.model('userdetail', UserDetailSchema);