const mongoose = require('mongoose');
const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList
} = graphql;

const UserDetail = mongoose.model('userdetail');
const Board = mongoose.model('board');
const Note = mongoose.model('note');

const NoteType = require('../types/note');

const UserDetailType = new GraphQLObjectType({
    name: 'UserDetailType',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        connections: {type: new GraphQLList(GraphQLID)},
        connectionDetails: {
            type: new GraphQLList(UserDetailType),
            resolve(parentValue) {
                return UserDetail.find({
                    _id: {
                        $in: parentValue.connections
                    }
                });
            }
        },
        boards: {
            type: new GraphQLList(require('./board')),
            resolve(parentValue) {
                return Board.find({
                    user: parentValue.id
                }).sort('-time');
            }
        },
        pinnedNotes: {
            type: new GraphQLList(NoteType),
            resolve(parentValue, args, context) {
                const {user: {id: userId}} = context;
                return Note.find({
                    owner: userId,
                    pinned: true
                }).sort('-time');
            }
        },
        sharedNotes: {
            type: new GraphQLList(NoteType),
            resolve(parentValue, args, context) {
                const {user: {id: userId}} = context;
                return Note.find({
                    sharedWith: userId.toString()
                }).sort('-time');
            }
        },
        recentNotes: {
            type: new GraphQLList(NoteType),
            resolve(parentValue, args, context) {
                const {user: {id: userId}} = context;
                return Note.find({
                    owner: userId
                }).sort('-time').limit(4);
            }
        }
    })
});

module.exports = UserDetailType;