const mongoose = require('mongoose');
const graphql = require('graphql');

const {
    GraphQLList,
    GraphQLID,
    GraphQLNonNull
} = graphql;

const Comment = mongoose.model('comment');
const CommentType = require('../types/comment');

const commentQuery = {
    comment: {
        type: CommentType,
        args: {
            id: {type: new GraphQLNonNull(GraphQLID)}
        },
        resolve(parentValue, {id}) {
            return Comment.findById(id);
        }
    },
    comments: {
        type: new GraphQLList(CommentType),
        args: {
            note: {type: new GraphQLNonNull(GraphQLID)}
        },
        resolve(parentValue, {note}) {
            return Comment.find({note});
        }
    }
};

module.exports = commentQuery;