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
        resolve(parentValue, {id}) {
            return Note.findById(id);
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
    },
    getSharedNotes: {
        type: new GraphQLList(NoteType),
        args: {
            id: {type: new GraphQLNonNull(GraphQLID)}
        },
        resolve(parentValue, {id}) {
            return Note.find({
                sharedWith: id
            }).sort('-time');
        }
    },
    getRecentNotes: {
        type: new GraphQLList(NoteType),
        args: {
            id: {type: new GraphQLNonNull(GraphQLID)}
        },
        resolve(parentValue, {id}) {
            return Note.find({
                owner: id
            }).sort('-time').limit(4);
        }
    }
};

module.exports = noteQuery;