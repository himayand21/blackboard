const graphql = require('graphql');
const mongoose = require('mongoose');

const {
    GraphQLString,
    GraphQLID
} = graphql;

const Comment = mongoose.model('comment');
const Note = mongoose.model('note');

const NoteType = require('../types/note');

const commentMutation = {
    addComment: {
        type: NoteType,
        args: {
            content: {type: GraphQLString},
            note: {type: GraphQLID}
        },
        async resolve(parentValue, args, context) {
            const {user: {id: userId}} = context;
            const comment = new Comment({
                ...args,
                sender: userId,
                time: Date.now()
            });
            await comment.save();
            return Note.findById(args.note);
        }
    }
};

module.exports = commentMutation;