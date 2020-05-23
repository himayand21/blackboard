const mongoose = require('mongoose');
const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString
} = graphql;

const UserDetail = mongoose.model('userdetail');
const Note = mongoose.model('note');

const CommentType = new GraphQLObjectType({
    name: 'CommentType',
    fields: () => ({
        id: {type: GraphQLID},
        content: {type: GraphQLString},
        sender: {type: GraphQLID},
        note: {type: GraphQLID},
        time: {type: GraphQLString},
        senderDetails: {
            type: require('./userDetail'),
            resolve(parentValue) {
                return UserDetail.findById(parentValue.sender);
            }
        },
        noteDetails: {
            type: require('./note'),
            resolve(parentValue) {
                return Note.findById(parentValue.note);
            }
        }
    })
});

module.exports = CommentType;