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
        resolve(parentValue, args, context) {
            const {user: {id: userId}} = context;
            return UserDetail.findById(userId);
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
    },
    searchUserByEmail: {
        type: UserDetailType,
        args: {
            email: {type: GraphQLString}
        },
        async resolve(parentValue, {email}, context) {
            const {user: {id: userId}} = context;
            const userDetails = await UserDetail.findById(userId);
            return UserDetail.findOne({
                email,
                _id: {
                    $nin: userDetails.connections,
                    $ne: userId
                }
            });
        }
    }
};

module.exports = userDetailQuery;