const mongoose = require('mongoose');
const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLBoolean
} = graphql;

const Comment = mongoose.model('comment');
const UserDetail = mongoose.model('userdetail');
const Board = mongoose.model('board');

const NoteType = new GraphQLObjectType({
    name: 'NoteType',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        board: {type: GraphQLID},
        editor: {type: GraphQLString},
        time: {type: GraphQLString},
        owner: {type: GraphQLID},
        pinned: {type: GraphQLBoolean},
        sharedWithEveryone: {type: GraphQLBoolean},
        sharedWith: {type: new GraphQLList(GraphQLString)},
        sharedWithDetails: {
            type: new GraphQLList(require('./userDetail')),
            resolve(parentValue) {
                return UserDetail.find({
                    _id: {
                        $in: parentValue.sharedWith
                    }
                });
            }
        },
        comments: {
            type: new GraphQLList(require('./comment')),
            resolve(parentValue) {
                return Comment.find({
                    note: parentValue.id
                }).sort('-time');
            }
        },
        ownerDetails: {
            type: require('./userDetail'),
            resolve(parentValue) {
                return UserDetail.findById(parentValue.owner);
            }
        },
        boardDetails: {
            type: require('./board'),
            resolve(parentValue) {
                return Board.findById(parentValue.board);
            }
        }
    })
});

module.exports = NoteType;