const graphql = require('graphql');
const mongoose = require('mongoose');

const {
    GraphQLString,
    GraphQLID
} = graphql;

const Comment = mongoose.model('comment');
const CommentType = require('../types/comment');

const commentMutation = {
    addComment: {
        type: CommentType,
        args: {
            content: {type: GraphQLString},
            sender: {type: GraphQLID},
            note: {type: GraphQLID},
            time: {type: GraphQLString}
        },
        resolve(parentValue, args) {
            return (new Comment({
                ...args,
                time: Date.now()
            })).save();
        }
    }
};

module.exports = commentMutation;