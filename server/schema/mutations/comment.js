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
            note: {type: GraphQLID}
        },
        resolve(parentValue, args, context) {
            const {user: {id: userId}} = context;
            return (new Comment({
                ...args,
                sender: userId,
                time: Date.now()
            })).save();
        }
    }
};

module.exports = commentMutation;