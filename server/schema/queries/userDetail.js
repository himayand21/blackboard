const mongoose = require('mongoose');
const graphql = require('graphql');

const {
    GraphQLID,
    GraphQLNonNull,
    GraphQLString
} = graphql;

const UserDetail = mongoose.model('userdetail');
const Note = mongoose.model('note');

const UserDetailType = require('../types/userDetail');

const userDetailQuery = {
    userDetail: {
        type: UserDetailType,
        args: {
            id: {type: new GraphQLNonNull(GraphQLID)}
        },
        resolve(parentValue, {id}) {
            return UserDetail.findById(id);
        }
    },
    searchByEmail: {
        type: UserDetailType,
        args: {
            note: {type: new GraphQLNonNull(GraphQLID)},
            email: {type: GraphQLString}
        },
        async resolve(parentValue, {
            note,
            email
        }) {
            const selectedNote = await Note.findById(note);
            return UserDetail.findOne({
                email,
                _id: {
                    $nin: selectedNote.sharedWith,
                    $ne: selectedNote.owner
                }
            });
        }
    }
};

module.exports = userDetailQuery;