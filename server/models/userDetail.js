const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserDetailSchema = new Schema({
    name: {type: String},
    _id: {type: String},
    email: {type: String}
});

mongoose.model('userdetail', UserDetailSchema);