const mongoose = require('mongoose');
const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList
} = graphql;

const Comment = mongoose.model('comment');

const NoteType = new GraphQLObjectType({
    name: 'NoteType',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        board: {type: GraphQLID},
        editor: {type: GraphQLString},
        time: {type: GraphQLString},
        owner: {type: GraphQLString},
        comments: {
            type: new GraphQLList(require('./comment')),
            resolve(parentValue) {
                return Comment.find({
                    note: parentValue.id
                });
            }
        }
    })
});

module.exports = NoteType;