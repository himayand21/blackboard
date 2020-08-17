const mongoose = require('mongoose');
const graphql = require('graphql');

const {
    GraphQLList,
    GraphQLID,
    GraphQLNonNull
} = graphql;

const Note = mongoose.model('note');
const NoteType = require('../types/note');

const noteQuery = {
    note: {
        type: NoteType,
        args: {
            id: {type: new GraphQLNonNull(GraphQLID)}
        },
        async resolve(parentValue, {id}, context) {
            const {user: {id: userId}} = context;
            const note = await Note.findById(id);
            if (note.sharedWithEveryone || (note.owner === userId.toString()) || note.sharedWith.includes(userId.toString())) return note;
            throw new Error('Unauthorized');
        }
    },
    notes: {
        type: new GraphQLList(NoteType),
        args: {
            board: {type: new GraphQLNonNull(GraphQLID)}
        },
        resolve(parentValue, {board}) {
            return Note.find({board}).sort('-time');
        }
    }
};

module.exports = noteQuery;